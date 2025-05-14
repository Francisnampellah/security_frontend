import { Search, Shield, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import { scan } from "@/services/scan"
import { useScanSessions } from "@/pages/inventory/hooks/useScanSessions"
import { Card, CardContent } from "@/components/ui/card"
// interface SearchBarProps {
//   onScanStart?: (scanId: string, sessionId: string) => void
// }

export const ScanInput = () => {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { updateSpiderScanStatus, startSpiderScan } = useScanSessions()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setIsLoading(true)
    try {
      const response = await startSpiderScan.mutate(url)
      console.log(response)
      setUrl("")
    } catch (error) {
      console.error("Failed to start spider scan:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="mb-8 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/50 dark:to-background">
      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Start a New Security Scan</h2>
            <p className="text-sm text-muted-foreground">
              Enter a URL to begin vulnerability testing
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-blue-500" />
                <Input
                  placeholder="https://example.com"
                  className="pl-10 h-12 text-lg border-blue-200 dark:border-blue-800 focus:border-blue-500 dark:focus:border-blue-400"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  type="url"
                  required
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-12 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/20"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Scanning...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Start Scan</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Make sure to include the full URL including https:// or http://
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 