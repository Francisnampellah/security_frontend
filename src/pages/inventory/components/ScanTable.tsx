import { ScanSession, ScanAlert } from "@/type"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, RefreshCw, Eye, Loader2, Globe, Server, Shield, AlertTriangle, Info } from "lucide-react"
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
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { formatDistanceToNow } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface ScanTableProps {
  data?: ScanSession[] | null
  isLoading?: boolean
}

export function ScanTable({ data = [], isLoading }: ScanTableProps) {
  const [selectedScan, setSelectedScan] = useState<ScanSession | null>(null)
  const [selectedNonTechnical, setSelectedNonTechnical] = useState<string | null>(null)

  // Ensure data is always an array
  const scanSessions = Array.isArray(data) ? data : []

  const handleViewResults = (session: ScanSession) => {
    setSelectedScan(session)
  }

  const handleViewNonTechnical = (description: string) => {
    setSelectedNonTechnical(description)
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20'
      case 'low':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20'
    }
  }

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

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>URL</TableHead>
              <TableHead>Server Info</TableHead>
              <TableHead>Started</TableHead>
              <TableHead>Spider Progress</TableHead>
              <TableHead>Active Scan Progress</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scanSessions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  No scan sessions found. Start a new scan to begin.
                </TableCell>
              </TableRow>
            ) : (
              scanSessions.map((session) => {
                const isSpiderComplete = session.spiderStatus === 100
                const isActiveComplete = session.activeStatus === 100
                const showViewResult = isSpiderComplete && isActiveComplete

                return (
                  <TableRow key={session.id} className="group">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <div className="font-mono text-sm">{session.url}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-muted-foreground" />
                        <div className="text-sm">
                          <div className="font-medium">{session.webServer}</div>
                          <div className="text-muted-foreground">{session.ipAddress}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(session.startedAt), { addSuffix: true })}
                      </div>
                    </TableCell>
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
                      <div className="flex items-center gap-2">
                        {showViewResult && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewResults(session)}
                          >
                            <Shield className="h-4 w-4" />
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

      <Dialog open={!!selectedScan} onOpenChange={() => setSelectedScan(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Scan Results</DialogTitle>
          </DialogHeader>
          {selectedScan && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Target Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedScan.url}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedScan.webServer}</span>
                    </div>
                    <div className="text-muted-foreground">
                      IP: {selectedScan.ipAddress}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedScan.technologies.map((tech, index) => (
                      <Badge key={index} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {selectedScan.activeResults && selectedScan.activeResults.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Security Alerts</h3>
                  <div className="space-y-4">
                    {Array.from(
                      new Map<string, ScanAlert>(
                        selectedScan.activeResults
                          .map(alert => {
                            const referenceKey = Object.keys(alert.tags).sort().join(',');
                            return [referenceKey, alert] as [string, ScanAlert];
                          })
                          .sort((a, b) => {
                            const riskOrder = { high: 0, medium: 1, low: 2 };
                            return riskOrder[a[1].risk.toLowerCase()] - riskOrder[b[1].risk.toLowerCase()];
                          })
                      ).values()
                    ).map((alert, index) => (
                      <Card key={alert.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                                <h4 className="font-medium">{alert.name}</h4>
                                <Badge className={getRiskColor(alert.risk)}>
                                  {alert.risk}
                                </Badge>
                                {selectedScan.translatedResults?.[index]?.nonTechnicalDescription && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0"
                                    onClick={() => handleViewNonTechnical(selectedScan.translatedResults[index].nonTechnicalDescription)}
                                  >
                                    <Info className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {alert.description}
                              </p>
                              {alert.solution && (
                                <div className="mt-2">
                                  <h5 className="text-sm font-medium mb-1">Solution</h5>
                                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                                    {alert.solution}
                                  </p>
                                </div>
                              )}
                              {Object.entries(alert.tags).length > 0 && (
                                <div className="mt-2">
                                  <h5 className="text-sm font-medium mb-1">References</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {Object.entries(alert.tags).map(([key, value]) => (
                                      <a
                                        key={key}
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-blue-500 hover:underline"
                                      >
                                        {key}
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  No security alerts found
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedNonTechnical} onOpenChange={() => setSelectedNonTechnical(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Non-Technical Description</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground">
              {selectedNonTechnical}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}