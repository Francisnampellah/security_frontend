"use client"

import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
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
        <div className="space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-medium">Basic Information</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Manufacturer</Label>
                <div className="text-sm">{medicine.manufacturer.name}</div>
              </div>
              <div>
                <Label>Category</Label>
                <div className="text-sm">{medicine.category.name}</div>
              </div>
              <div>
                <Label>Unit</Label>
                <div className="text-sm">{medicine.unit.name}</div>
              </div>
              <div>
                <Label>Dosage</Label>
                <div className="text-sm">{medicine.dosage || "N/A"}</div>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div>
            <h3 className="text-lg font-medium">Pricing Information</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Selling Price</Label>
                <div className="text-2xl font-bold">
                  ${Number.parseFloat(medicine.sellPrice).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Stock Information */}
          <div>
            <h3 className="text-lg font-medium">Stock Information</h3>
            <Separator className="my-2" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Current Stock</Label>
                <div className="text-2xl font-bold">{medicine.stock?.quantity ?? 0} units</div>
                <div className="mt-1">{getStockStatus(medicine.stock?.quantity ?? 0)}</div>
              </div>
              <div>
                <Label>Last Updated</Label>
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Created At</Label>
                <div className="text-sm">
                  {format(new Date(medicine.createdAt), "MMM dd, yyyy 'at' h:mm a")}
                </div>
              </div>
              <div>
                <Label>Last Updated</Label>
                <div className="text-sm">
                  {format(new Date(medicine.updatedAt), "MMM dd, yyyy 'at' h:mm a")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 