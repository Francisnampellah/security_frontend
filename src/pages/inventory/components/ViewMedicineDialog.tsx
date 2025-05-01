"use client"

import { format } from "date-fns"
import { Calendar, Package, Tag, Truck, Pill } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Medicine } from "../../../type"

interface ViewMedicineDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  medicine: Medicine | null
}

export function ViewMedicineDialog({ open, onOpenChange, medicine }: ViewMedicineDialogProps) {
  if (!medicine) return null

  // Function to get stock status badge
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{medicine.name}</DialogTitle>
          <DialogDescription>
            View detailed information about this medicine
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium">Basic Information</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Category:</span>
                <span className="text-sm font-medium">{medicine.category.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Manufacturer:</span>
                <span className="text-sm font-medium">{medicine.manufacturer.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Unit:</span>
                <span className="text-sm font-medium">{medicine.unit.name}</span>
              </div>
              {medicine.dosage && (
                <div className="flex items-center gap-2">
                  <Pill className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Dosage:</span>
                  <span className="text-sm font-medium">{medicine.dosage}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Added on:</span>
                <span className="text-sm font-medium">
                  {format(new Date(medicine.createdAt), "MMM dd, yyyy")}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div>
            <h3 className="text-lg font-medium">Pricing Information</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <span className="text-sm text-muted-foreground">Selling Price:</span>
                <div className="text-2xl font-bold">
                  ${Number.parseFloat(medicine.sellPrice).toFixed(2)}
                </div>
              </div>
              {/* Additional pricing information can be added here */}
            </div>
          </div>

          {/* Stock Information */}
          <div>
            <h3 className="text-lg font-medium">Stock Information</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <span className="text-sm text-muted-foreground">Current Stock:</span>
                <div className="text-2xl font-bold">{medicine.stock?.quantity ?? 0} units</div>
                <div className="mt-1">{getStockStatus(medicine.stock?.quantity ?? 0)}</div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Last Updated:</span>
                <div className="text-sm font-medium">
                  {format(new Date(medicine.stock?.updatedAt ?? medicine.updatedAt), "MMM dd, yyyy 'at' h:mm a")}
                </div>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div>
            <h3 className="text-lg font-medium">System Information</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Medicine ID:</span>
                <span className="text-sm font-mono">{medicine.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Created At:</span>
                <span className="text-sm">
                  {format(new Date(medicine.createdAt), "MMM dd, yyyy 'at' h:mm a")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Updated:</span>
                <span className="text-sm">
                  {format(new Date(medicine.updatedAt), "MMM dd, yyyy 'at' h:mm a")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 