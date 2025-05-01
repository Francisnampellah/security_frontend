import { format } from "date-fns"
import { MoreHorizontal, ArrowUpDown, Pencil, Plus, Trash2, Filter } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { Medicine } from "../../../type"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface InventoryTableProps {
  medicines: Medicine[]
  isLoading: boolean
  onDelete: (id: number) => void
  onUpdateStock: (medicine: Medicine) => void
  onView: (medicine: Medicine) => void
  onEdit: (medicine: Medicine) => void
  isDeleting?: boolean
  deletingId?: number
}

export function InventoryTable({
  medicines,
  isLoading,
  onDelete,
  onUpdateStock,
  onView,
  onEdit,
  isDeleting,
  deletingId
}: InventoryTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const getStockStatus = (quantity: number) => {
    if (quantity <= 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (quantity < 10) {
      return (
        <Badge variant="secondary" className="bg-orange-500 hover:bg-orange-600">
          Low Stock
        </Badge>
      )
    } else {
      return (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600">
          In Stock
        </Badge>
      )
    }
  }

  const columns: ColumnDef<Medicine>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => {
        return <div className="font-medium">{row.getValue("name")}</div>
      },
    },
    {
      accessorKey: "manufacturer",
      header: "Manufacturer",
      cell: ({ row }) => {
        const manufacturer = row.original.manufacturer
        return <div>{manufacturer?.name || '-'}</div>
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.original.category
        return <div>{category?.name || '-'}</div>
      },
    },
    {
      accessorKey: "dosage",
      header: "Dosage",
      cell: ({ row }) => {
        return <div>{row.getValue("dosage") || '-'}</div>
      },
    },
    {
      accessorKey: "stock",
      header: "Quantity",
      cell: ({ row }) => {
        const stock = row.original.stock
        return <div>{stock?.quantity ?? 0}</div>
      },
    },
    {
      accessorKey: "unit",
      header: "Unit",
      cell: ({ row }) => {
        const unit = row.original.unit
        return <div>{unit?.name || '-'}</div>
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const medicine = row.original
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => onView(medicine)}>
                  View details
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onEdit(medicine)}>
                  Edit medicine
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateStock(medicine)}>
                  Update stock
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive"
                  onClick={() => onDelete(medicine.id)}
                  disabled={isDeleting && deletingId === medicine.id}
                >
                  {isDeleting && deletingId === medicine.id ? "Deleting..." : "Delete"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )
      },
    }
  ]

  const table = useReactTable({
    data: medicines,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  return (
    <div className=" mx-auto mt-10">
      <div className="bg-white rounded-2xl shadow p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">Inventory</h2>
          <p className="text-muted-foreground mb-4">Here's a list of all medicines in your inventory.</p>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Input
              placeholder="Filter medicines..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="max-w-xs"
            />
            <Button variant="outline" size="sm" className="flex items-center gap-1"><Filter className="h-4 w-4" /> Category</Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1"><ArrowUpDown className="h-4 w-4" /> Quantity</Button>
            <div className="ml-auto">
              <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5" /></Button>
            </div>
          </div>
        </div>
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="bg-white font-semibold text-muted-foreground">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={index}>
                    {columns.map((col, i) => (
                      <TableCell key={i}><Skeleton className="h-5 w-24" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="transition-colors hover:bg-muted/50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="align-middle">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            {/* You can add row selection info here if you implement selection */}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center space-x-2">
              <Select
                value={table.getState().pagination.pageSize.toString()}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              &lt;
            </Button>
            <span className="text-sm px-2">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 