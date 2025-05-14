import { ScanSession, ScanAlert } from "@/type"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, RefreshCw, Play, Eye, Shield, Loader2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { useScanSessions } from "../hooks/useScanSessions"
import { startActiveScan } from "@/services/scan"
import { useState, useEffect } from "react"
import { ScanResultsModal } from "./ScanResultsModal"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ScanTableProps {
  data: any
  isLoading?: boolean
}

export function ScanTable({ data, isLoading }: ScanTableProps) {
  const { createSession, scanSessions, updateSpiderScanStatus, updateActiveScanStatus, getAlerts } = useScanSessions()
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false)
  const [currentAlerts, setCurrentAlerts] = useState<ScanAlert[]>([])
  const [loadingAlerts, setLoadingAlerts] = useState<string | null>(null)

  useEffect(() => {
    if (data?.scanSessions) {
      const refreshInterval = setInterval(() => {
        data.scanSessions.forEach((session: ScanSession) => {
          if (session.spiderStatus < 100) {
            updateSpiderScanStatus.mutate(session.spiderId.toString())
          }
          if (session.activeId && session.activeStatus < 100) {
            updateActiveScanStatus.mutate(session.activeId.toString())
          }
        })
      }, 5000)

      return () => clearInterval(refreshInterval)
    }
  }, [data?.scanSessions, updateSpiderScanStatus, updateActiveScanStatus])

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleGetAlerts = async (session: ScanSession) => {
    setLoadingAlerts(session.id.toString())
    try {
      const result = await getAlerts.mutateAsync(session.url)
      const uniqueAlerts = result.reduce((acc: ScanAlert[], current: ScanAlert) => {
        const isDuplicate = acc.some(alert => 
          alert.name === current.name && 
          alert.risk === current.risk &&
          alert.url === current.url &&
          alert.param === current.param &&
          alert.alert === current.alert
        )
        if (!isDuplicate) {
          acc.push(current)
        }
        return acc
      }, [])
      setCurrentAlerts(uniqueAlerts)
      setIsResultsModalOpen(true)
    } catch (error) {
      console.error('Failed to get alerts:', error)
    } finally {
      setLoadingAlerts(null)
    }
  }

  const handleStartActiveScan = async (session: ScanSession) => {
    try {
      await startActiveScan(session.url)
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error('Failed to start active scan:', error)
    }
  }

  const handleRefreshScan = (session: ScanSession) => {
    if (session.spiderStatus != 100) {
      updateSpiderScanStatus.mutate(session.spiderId.toString())
    } else {
      updateActiveScanStatus.mutate(session.activeId.toString())
    }
  }

  return (
    <Card className="border-blue-200 dark:border-blue-800">
      <CardHeader className="border-b border-border bg-muted/50">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle>Scan Sessions</CardTitle>
            <CardDescription>
              Monitor and manage your security scans
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="w-[200px]">Spider Scan</TableHead>
                <TableHead className="w-[200px]">Active Scan</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.scanSessions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No scan sessions found. Start a new scan to begin.
                  </TableCell>
                </TableRow>
              ) : (
                data.scanSessions.map((session) => {
                  const isSpiderComplete = session.spiderStatus === 100
                  const isActiveComplete = session.activeStatus === 100
                  const showRefresh = !isSpiderComplete || !isActiveComplete
                  const showActiveScan = isSpiderComplete && session.activeStatus === 0
                  const showViewResult = isSpiderComplete && isActiveComplete
                  const isLoading = loadingAlerts === session.id.toString()

                  return (
                    <TableRow key={session.id} className="group">
                      <TableCell className="font-medium">{session.id}</TableCell>
                      <TableCell className="font-mono text-sm">{session.url}</TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-medium">{session.spiderStatus}%</span>
                          </div>
                          <Progress value={session.spiderStatus} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Progress</span>
                            <span className="text-sm font-medium">{session.activeStatus}%</span>
                          </div>
                          <Progress value={session.activeStatus} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          {showRefresh && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                              onClick={() => handleRefreshScan(session)}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                          {showActiveScan && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                              onClick={() => handleStartActiveScan(session)}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          )}
                          {showViewResult && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0 hover:bg-green-50 dark:hover:bg-green-900/20"
                              onClick={() => handleGetAlerts(session)}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <ScanResultsModal 
        isOpen={isResultsModalOpen}
        onOpenChange={setIsResultsModalOpen}
        alerts={currentAlerts}
      />
    </Card>
  )
}