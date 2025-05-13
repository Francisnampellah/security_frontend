import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"
import { scan } from "@/services/scan"
import { useScanSessions } from "@/pages/inventory/hooks/useScanSessions"
// interface SearchBarProps {
//   onScanStart?: (scanId: string, sessionId: string) => void
// }

export const SearchBar = () => {
  const [url, setUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { updateSpiderScanStatus,startSpiderScan} = useScanSessions()

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
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative z-50 w-full md:w-2/3">
        <div className="relative flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter URL to scan..."
              className="pl-8"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Scanning..." : "Start Scan"}
          </Button>
        </div>
      </div>
    </form>
  )
} 