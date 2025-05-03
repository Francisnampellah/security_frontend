import { Medicine } from "@/type"
import { MedicineCard } from "./MedicineCard"

interface SearchResultsProps {
  medicines: Medicine[]
  onSell: (data: { medicineId: number; quantity: number; price: number }) => void
}

export const SearchResults = ({ medicines, onSell }: SearchResultsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Search Results</h2>
      <div className="grid gap-6">
        {medicines.map((medicine) => (
          <MedicineCard key={medicine.id} medicine={medicine} onSell={onSell} />
        ))}
      </div>
    </div>
  )
} 