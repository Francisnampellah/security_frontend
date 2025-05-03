import { format } from "date-fns"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Purchase } from "../../../type"
import { 
  Package, 
  Hash, 
  DollarSign, 
  Calendar, 
  User, 
  Clock, 
  Boxes,
  Tag,
  Info
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "../../../utils/formatCurrency"

interface ViewPurchaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  purchase: Purchase | null
}

export function ViewPurchaseDialog({
  open,
  onOpenChange,
  purchase,
}: ViewPurchaseDialogProps) {
  if (!purchase) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Info className="h-6 w-6" />
            Purchase Details
          </DialogTitle>
        </DialogHeader>

        {/* Basic Information Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            <Badge variant="outline">#{purchase.id}</Badge>
          </div>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Package className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Medicine</h3>
                <p className="text-lg font-semibold">{purchase.medicine.name} ({purchase.medicine.manufacturer.name})</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary">{purchase.medicine.manufacturer.name}</Badge>
                  <Badge variant="outline">{purchase.medicine.category.name}</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Boxes className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Quantity</h3>
                <p className="text-lg font-semibold">
                  {purchase.quantity} <span className="text-sm text-gray-500">{purchase.medicine.unit.name}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Financial Information</h3>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <DollarSign className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Cost Per Unit</h3>
                <p className="text-lg font-semibold">{formatCurrency(purchase.costPerUnit)}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <DollarSign className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Cost</h3>
                <p className="text-lg font-semibold">
                  {formatCurrency(parseFloat(purchase.costPerUnit) * purchase.quantity)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Batch Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Batch Information</h3>
          <Separator />
          <div className="flex items-start space-x-3">
            <Tag className="h-5 w-5 text-gray-500 mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Batch Details</h3>
              <p className="text-lg font-semibold">
                #{purchase.batch.id} - {format(new Date(purchase.batch.purchaseDate), "MMM dd, yyyy")}
              </p>
            </div>
          </div>
        </div>

        {/* Audit Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Audit Information</h3>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created By</h3>
                <p className="text-lg font-semibold">{purchase.user.name}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gray-500 mt-1" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                <p className="text-lg font-semibold">
                  {format(new Date(purchase.createdAt), "MMM dd, yyyy HH:mm")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 