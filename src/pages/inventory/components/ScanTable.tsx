import { ScanSession, ScanAlert } from "@/type"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, RefreshCw, Play, Eye } from "lucide-react"
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

interface ScanTableProps {
  data: any
  isLoading?: boolean
}

export function ScanTable({ data, isLoading }: ScanTableProps) {
  const { createSession, scanSessions, updateSpiderScanStatus, updateActiveScanStatus, getAlerts } = useScanSessions()
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false)
  const [currentAlerts, setCurrentAlerts] = useState<ScanAlert[]>([])

  useEffect(() => {
    if (data?.scanSessions) {
      const refreshInterval = setInterval(() => {
        data.scanSessions.forEach((session: ScanSession) => {
          // Refresh spider scan if not complete
          if (session.spiderStatus < 100) {
            updateSpiderScanStatus.mutate(session.spiderId.toString())
          }
          
          // Refresh active scan if it exists and is not complete
          if (session.activeId && session.activeStatus < 100) {
            updateActiveScanStatus.mutate(session.activeId.toString())
          }
        })
      }, 5000) // Refresh every 5 seconds

      return () => clearInterval(refreshInterval)
    }
  }, [data?.scanSessions, updateSpiderScanStatus, updateActiveScanStatus])

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    )
  }

  const handleGetAlerts = async (session: ScanSession) => {
    try {
      const result = await getAlerts.mutateAsync(session.url)
      // Filter out duplicate alerts by comparing their properties
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
    }
  }

  const handleStartActiveScan = async (session: ScanSession) => {
    console.log(session)
    await startActiveScan(session.url)
  }

  const handleRefreshScan = (session: ScanSession) => {
    console.log(session)
    if (session.spiderStatus != 100) {
      updateSpiderScanStatus.mutate(session.spiderId.toString())
    } else {
      updateActiveScanStatus.mutate(session.activeId.toString())
    }
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>URL</TableHead>
              {/* <TableHead>Spider ID</TableHead>
              <TableHead>Active ID</TableHead> */}
              <TableHead>Spider Scan Status</TableHead>
              <TableHead>Active Scan Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.scanSessions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No scan sessions found.
                </TableCell>
              </TableRow>
            ) : (
              data.scanSessions.map((session) => {
                const isSpiderComplete = session.spiderStatus === 100
                const isActiveComplete = session.activeStatus === 100
                const showRefresh = !isSpiderComplete || !isActiveComplete
                const showActiveScan = isSpiderComplete && session.activeStatus === 0
                const showViewResult = isSpiderComplete && isActiveComplete

                return (
                  <TableRow key={session.id}>
                    <TableCell>{session.id}</TableCell>
                    <TableCell>{session.url}</TableCell>
                    {/* <TableCell>{session.spiderId}</TableCell>
                    <TableCell>{session.activeId || "N/A"}</TableCell> */}
                    <TableCell>{session.spiderStatus} %</TableCell>
                    <TableCell>{session.activeStatus} %</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {showRefresh && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              handleRefreshScan(session)
                            }}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        )}
                        {showActiveScan && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {handleStartActiveScan(session)}}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        )}
                        {showViewResult && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              handleGetAlerts(session)
                            }}
                          >
                            <Eye className="h-4 w-4" />
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
      <ScanResultsModal 
        isOpen={isResultsModalOpen}
        onOpenChange={setIsResultsModalOpen}
        alerts={currentAlerts}
      />
    </>
  )
}