import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ScanAlert } from "@/type"

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

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Scan Results</DialogTitle>
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