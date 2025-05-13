import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Medicine } from "@/type"

interface SellModalProps {
  isOpen: boolean
  onClose: () => void
  medicine: Medicine
  onSubmit: (data: { medicineId: number; quantity: number; price: number }) => void
}

export const SellModal = ({ isOpen, onClose, medicine, onSubmit }: SellModalProps) => {
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState<number>(0)


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // handleSell({
    //   medicineId: medicine.id,
    //   quantity: Number(quantity),
    //   totalPrice: price.toString()
    // })

    onClose()
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuantity(value)
    const numericValue = Number(value)
    const sellPrice = Number(medicine.sellPrice)
    if (!isNaN(numericValue) && !isNaN(sellPrice)) {
      setPrice(numericValue * sellPrice)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sell {medicine.name} - {medicine.manufacturer.name}</DialogTitle>
          <DialogDescription>Category : {medicine.category.name}</DialogDescription>
          <DialogDescription>Available stock : {medicine.stock.quantity} {medicine.unit.name}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              max={medicine.stock.quantity}
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="Enter quantity"
              required
            />

            <p className="text-sm text-muted-foreground">
              Price Per unit: {medicine.sellPrice} Tsh
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Total price</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Enter price"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Confirm Sale</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 