import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

interface Medicine {
  id: string
  name: string
  sku: string
  price: string
  stock: number
}

interface MedicineSearchModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  filteredMedicines: Medicine[]
  onMedicineSelect: (medicine: Medicine) => void
}

export function MedicineSearchModal({
  isOpen,
  onOpenChange,
  searchQuery,
  onSearchChange,
  filteredMedicines,
  onMedicineSelect,
}: MedicineSearchModalProps) {
  return (
    <Dialog 
      open={isOpen} 
      onOpenChange={onOpenChange}
      modal={true}
    >
      <DialogContent 
        className="sm:max-w-[600px]"
        onPointerDownOutside={(e) => {
          e.preventDefault()
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle>Search Medicines</DialogTitle>
        </DialogHeader>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            className="pl-10"
            placeholder="Search medicine by name or code..."
            value={searchQuery}
            onChange={(e) => {
              e.stopPropagation()
              onSearchChange(e.target.value)
            }}
            onClick={(e) => {
              e.stopPropagation()
            }}
            autoFocus
          />
        </div>
        <div className="space-y-4 py-4">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine) => (
              <div
                key={medicine.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => onMedicineSelect(medicine)}
              >
                <div>
                  <h3 className="font-medium">{medicine.name}</h3>
                  <p className="text-sm text-gray-500">SKU: {medicine.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{medicine.price}</p>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={medicine.stock > 100 ? "default" : medicine.stock > 50 ? "outline" : "destructive"}
                    >
                      {medicine.stock} in stock
                    </Badge>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No medicines found matching "{searchQuery}"</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 