import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Purchase, Batch } from "../../../type"
import { useState, useEffect } from "react"
import { usePurchase } from "../hooks/usePurchase"
import { 
  Package, 
  DollarSign, 
  Boxes,
  Info,
  Tag
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchBatches } from "../../../services/batch"

interface AddPurchaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  purchase: Purchase | null
  onSubmit: () => void
}

export function AddPurchaseDialog({
  open,
  onOpenChange,
  purchase,
  onSubmit,
}: AddPurchaseDialogProps) {
  const [formData, setFormData] = useState({
    batchId: purchase?.batch.id || 0,
    quantity: purchase?.quantity || 0,
    costPerUnit: purchase?.costPerUnit || "0",
  })
  const [batches, setBatches] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)

  const {updateMutation} = usePurchase()

  useEffect(() => {
    const fetchBatch = async () => {
      
      setIsLoading(true)
        try {
          const response = await fetchBatches()
        setBatches(response.data)
      } catch (error) {
        console.error('Error fetching batches:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBatch()
  }, [purchase?.medicine.id])

  useEffect(() => {
    if (purchase) {
      setFormData({
        batchId: purchase.batch.id,
        quantity: purchase.quantity,
        costPerUnit: purchase.costPerUnit,
      })
    }
  }, [purchase])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!purchase) return

    const updatedPurchase = {
      ...purchase,
      batchId: formData.batchId,
      quantity: formData.quantity,
      costPerUnit: formData.costPerUnit,
    }

    updateMutation.mutate({ id: purchase.id, purchase: updatedPurchase })
    onSubmit()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Info className="h-6 w-6" />
            Edit Purchase #{purchase?.id}
          </DialogTitle>
        </DialogHeader>

        {/* Medicine Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Medicine Information</h3>
          <Separator />
          <div className="flex items-start space-x-3">
            <Package className="h-5 w-5 text-gray-500 mt-1" />
            <div>
              <h3 className="text-sm font-medium text-gray-500">Medicine</h3>
              <p className="text-lg font-semibold">{purchase?.medicine.name}</p>
            </div>
          </div>
        </div>

        {/* Purchase Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Purchase Details</h3>
          <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batch" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Batch
              </Label>
              <Select
                value={formData.batchId.toString()}
                onValueChange={(value) => setFormData({ ...formData, batchId: parseInt(value) })}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder={isLoading ? "Loading batches..." : "Select batch"} />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((batch) => (
                    <SelectItem key={batch.id} value={batch.id.toString()}>
                      #{batch.id} - {new Date(batch.purchaseDate).toLocaleDateString()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity" className="flex items-center gap-2">
                <Boxes className="h-4 w-4" />
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                required
              />
              <p className="text-sm text-gray-500">
                Unit: {purchase?.medicine.unit.name}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="costPerUnit" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Cost Per Unit
              </Label>
              <Input
                id="costPerUnit"
                type="number"
                min="0"
                step="0.01"
                value={formData.costPerUnit}
                onChange={(e) => setFormData({ ...formData, costPerUnit: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        {/* Total Cost Preview */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Total Cost</Label>
          <p className="text-lg font-semibold">
            ${(parseFloat(formData.costPerUnit) * formData.quantity).toFixed(2)}
          </p>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Update Purchase
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 