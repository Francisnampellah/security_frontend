import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { ScanAlert } from "@/type"
import jsPDF from "jspdf"

interface ScanResultsModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  alerts: ScanAlert[]
}

export function ScanResultsModal({ isOpen, onOpenChange, alerts }: ScanResultsModalProps) {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'default'
      case 'low':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const generatePDF = () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const margin = 20
    let yOffset = 20

    // Add title
    doc.setFontSize(20)
    doc.text("Security Scan Report", pageWidth / 2, yOffset, { align: "center" })
    yOffset += 20

    // Add timestamp
    doc.setFontSize(12)
    doc.text(`Generated on: ${new Date().toLocaleString()}`, pageWidth / 2, yOffset, { align: "center" })
    yOffset += 20

    // Add summary
    doc.setFontSize(14)
    doc.text("Summary", margin, yOffset)
    yOffset += 10
    doc.setFontSize(12)
    doc.text(`Total Alerts: ${alerts.length}`, margin, yOffset)
    yOffset += 10
    doc.text(`High Risk: ${alerts.filter(a => a.risk.toLowerCase() === 'high').length}`, margin, yOffset)
    yOffset += 10
    doc.text(`Medium Risk: ${alerts.filter(a => a.risk.toLowerCase() === 'medium').length}`, margin, yOffset)
    yOffset += 10
    doc.text(`Low Risk: ${alerts.filter(a => a.risk.toLowerCase() === 'low').length}`, margin, yOffset)
    yOffset += 20

    // Add detailed findings
    doc.setFontSize(14)
    doc.text("Detailed Findings", margin, yOffset)
    yOffset += 20

    alerts.forEach((alert, index) => {
      // Check if we need a new page
      if (yOffset > doc.internal.pageSize.getHeight() - 40) {
        doc.addPage()
        yOffset = 20
      }

      // Add alert title and risk
      doc.setFontSize(14)
      doc.setTextColor(0, 0, 0)
      doc.text(`${index + 1}. ${alert.name}`, margin, yOffset)
      yOffset += 10

      // Add risk level
      doc.setFontSize(12)
      const riskColor = getRiskColor(alert.risk)
      doc.setTextColor(riskColor === 'destructive' ? 220 : riskColor === 'default' ? 0 : 100)
      doc.text(`Risk Level: ${alert.risk}`, margin, yOffset)
      doc.setTextColor(0, 0, 0)
      yOffset += 10

      // Add description
      doc.setFontSize(12)
      const descriptionLines = doc.splitTextToSize(alert.description, pageWidth - 2 * margin)
      doc.text(descriptionLines, margin, yOffset)
      yOffset += descriptionLines.length * 7 + 10

      // Add details
      doc.setFontSize(11)
      doc.text(`URL: ${alert.url}`, margin, yOffset)
      yOffset += 7
      doc.text(`Method: ${alert.method}`, margin, yOffset)
      yOffset += 7
      doc.text(`Confidence: ${alert.confidence}`, margin, yOffset)
      yOffset += 7
      doc.text(`CWE ID: ${alert.cweid}`, margin, yOffset)
      yOffset += 10

      // Add solution
      doc.setFontSize(12)
      doc.text("Solution:", margin, yOffset)
      yOffset += 7
      const solutionLines = doc.splitTextToSize(alert.solution, pageWidth - 2 * margin)
      doc.text(solutionLines, margin, yOffset)
      yOffset += solutionLines.length * 7 + 10

      // Add references if available
      if (alert.reference) {
        doc.text("References:", margin, yOffset)
        yOffset += 7
        const referenceLines = doc.splitTextToSize(alert.reference, pageWidth - 2 * margin)
        doc.text(referenceLines, margin, yOffset)
        yOffset += referenceLines.length * 7 + 10
      }

      yOffset += 10
    })

    // Save the PDF
    doc.save("security-scan-report.pdf")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Scan Results</DialogTitle>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={generatePDF}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{alert.name}</h3>
                  <Badge variant={getRiskColor(alert.risk)}>{alert.risk}</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">URL: </span>
                      <span className="text-muted-foreground">{alert.url}</span>
                    </div>
                    <div>
                      <span className="font-medium">Method: </span>
                      <span className="text-muted-foreground">{alert.method}</span>
                    </div>
                    <div>
                      <span className="font-medium">Confidence: </span>
                      <span className="text-muted-foreground">{alert.confidence}</span>
                    </div>
                    <div>
                      <span className="font-medium">CWE ID: </span>
                      <span className="text-muted-foreground">{alert.cweid}</span>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-medium mb-1">Solution:</h4>
                    <p className="text-sm text-muted-foreground">{alert.solution}</p>
                  </div>
                  {alert.reference && (
                    <div className="pt-2">
                      <h4 className="font-medium mb-1">References:</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">{alert.reference}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
} 