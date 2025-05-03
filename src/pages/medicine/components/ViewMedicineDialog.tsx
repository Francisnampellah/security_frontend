import { formatCurrency } from "../../../utils/formatCurrency"

const ViewMedicineDialog = ({ medicine, open, onOpenChange }: ViewMedicineDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Medicine Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Name</Label>
            <div className="text-sm text-gray-500">{medicine.name}</div>
          </div>
          <div>
            <Label>Manufacturer</Label>
            <div className="text-sm text-gray-500">{medicine.manufacturer.name}</div>
          </div>
          <div>
            <Label>Category</Label>
            <div className="text-sm text-gray-500">{medicine.category.name}</div>
          </div>
          <div>
            <Label>Unit</Label>
            <div className="text-sm text-gray-500">{medicine.unit.name}</div>
          </div>
          <div>
            <Label>Selling Price</Label>
            <div className="text-sm text-gray-500">{formatCurrency(medicine.sellPrice)}</div>
          </div>
          <div>
            <Label>Stock</Label>
            <div className="text-sm text-gray-500">{medicine.stock} {medicine.unit.name}</div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ViewMedicineDialog 