import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Medicine } from "@/type"
import { Package, Pill, DollarSign } from "lucide-react"
import { SellModal } from "./SellModal"

interface MedicineCardProps {
  medicine: Medicine
  onSell: (data: { medicineId: number; quantity: number; price: number }) => void
}

export const MedicineCard = ({ medicine, onSell }: MedicineCardProps) => {
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)

  return (
    <>
      <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
        <CardHeader className="pb-2 pt-4">
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-0.5">
              <CardTitle className="text-xl font-bold tracking-tight">{medicine.name}</CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-sm font-medium">{medicine.manufacturer.name}</span>
                <span className="text-muted-foreground/50">•</span>
                <span className="text-sm font-medium">{medicine.category.name}</span>
              </div>
            </div>
            <Button 
              variant="default" 
              size="sm" 
              className="text-sm font-semibold"
              onClick={() => setIsSellModalOpen(true)}
            >
              Sell
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-2 pb-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Stock</p>
                <p className="text-sm font-semibold">
                  {medicine.stock.quantity} {medicine.unit.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Dosage</p>
                <p className="text-sm font-semibold">{medicine.dosage}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">Price</p>
                <p className="text-lg font-bold text-primary">${medicine.sellPrice}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <SellModal
        isOpen={isSellModalOpen}
        onClose={() => setIsSellModalOpen(false)}
        medicine={medicine}
        onSubmit={onSell}
      />
    </>
  )
} 