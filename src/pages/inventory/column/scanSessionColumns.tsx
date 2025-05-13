import { ColumnDef } from "@tanstack/react-table"
import { ScanSession } from "@/type"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, RefreshCw, Play, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const scanSessionColumns: ColumnDef<ScanSession>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "spiderId",
    header: "Spider ID",
  },
  {
    accessorKey: "activeId",
    header: "Active ID",
    cell: ({ row }) => row.original.activeId || "N/A",
  },
  {
    accessorKey: "spiderStatus",
    header: "Spider Status",
    cell: ({ row }) => {
      const status = row.original.spiderStatus
      status
    },
  },
  {
    accessorKey: "activeStatus",
    header: "Active Status",
    cell: ({ row }) => {
      const status = row.original.activeStatus
      status
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const scanSession = row.original
      console.log(scanSession)
      const isSpiderComplete = scanSession.spiderStatus === 100
      const isActiveComplete = scanSession.activeStatus === 100
      const showRefresh = !isSpiderComplete || !isActiveComplete
      const showActiveScan = isSpiderComplete && scanSession.activeStatus === 0
      const showViewResult = isSpiderComplete && isActiveComplete

      return (
        <div className="flex items-center gap-2">
          {showRefresh && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => {
                // Add refresh logic here
                console.log('Refresh scan:', scanSession.id)
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
              onClick={() => {
                // Add active scan logic here
                console.log('Start active scan:', scanSession.id)
              }}
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
                // Add view result logic here
                console.log('View results:', scanSession.id)
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(scanSession.url)}
              >
                Copy URL
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => window.open(scanSession.url, '_blank')}
              >
                Open URL
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
] 