import { ScanSession } from "@/type"
import { Button } from "@/components/ui/button"
import { Loader2, Download, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PDFDownloadLink } from '@react-pdf/renderer'
import { NonTechnicalReportPDF } from "@/components/reports/NonTechnicalReportPDF"

interface NonTechnicalReport {
  name: string;
  risk: string;
  description: string;
}

interface NonTechnicalReportModalProps {
  scan: ScanSession | null;
  reports: NonTechnicalReport[] | null;
  onClose: () => void;
}

export function NonTechnicalReportModal({ scan, reports, onClose }: NonTechnicalReportModalProps) {
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

  return (
    <Dialog open={!!scan && !!reports} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Non-Technical Security Report</DialogTitle>
            {scan && reports && (
              <PDFDownloadLink
                document={
                  <NonTechnicalReportPDF
                    reports={reports}
                    targetInfo={{
                      url: scan.url,
                      webServer: scan.webServer,
                      ipAddress: scan.ipAddress
                    }}
                  />
                }
                fileName={`non-technical-report-${scan.url.replace(/[^a-z0-9]/gi, '-')}.pdf`}
              >
                {({ loading }) => (
                  <Button variant="outline" size="sm" disabled={loading}>
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                )}
              </PDFDownloadLink>
            )}
          </div>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-8rem)] pr-4">
          <div className="space-y-6 py-4">
            {reports?.map((item, index) => (
              <div key={index} className="rounded-lg border bg-card p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <Badge className={getRiskColor(item.risk)}>
                        {item.risk}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 