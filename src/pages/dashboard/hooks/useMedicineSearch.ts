import { useState } from "react"
import { fetchMedicines } from "@/services/inventory"
import { useQuery } from "@tanstack/react-query"
import { Medicine } from "@/type"

// Mock data - In a real app, this would come from an API
// const medicineResults = [
//   {
//     id: "1",
//     name: "Paracetamol 500mg",
//     sku: "MED-P500",
//     stock: 245,
//     price: "$5.99",
//   },
//   {
//     id: "2",
//     name: "Amoxicillin 250mg",
//     sku: "MED-A250",
//     stock: 120,
//     price: "$12.50",
//   },
//   {
//     id: "3",
//     name: "Ibuprofen 400mg",
//     sku: "MED-I400",
//     stock: 180,
//     price: "$7.25",
//   },
//   {
//     id: "4",
//     name: "Cetirizine 10mg",
//     sku: "MED-C010",
//     stock: 95,
//     price: "$8.99",
//   },
//   {
//     id: "5",
//     name: "Pantoprazole 40mg",
//     sku: "MED-P040",
//     stock: 75,
//     price: "$15.75",
//   },
// ]

export const useMedicineSearch = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([])

  const { data: medicines = [], isLoading, isError, error: queryError } = useQuery({
    queryKey: ['medicines'],
    queryFn: fetchMedicines,
  })
  

  // Debounce implementation
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setIsSearching(query.length > 0)

    if (query.length >= 2) {
      const results = medicines.filter(
        (medicine) =>
          medicine.name.toLowerCase().includes(query.toLowerCase()) ||
          medicine.manufacturer.name.toLowerCase().includes(query.toLowerCase()) ||
          medicine.category.name.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredMedicines(results)
    } else {
      setFilteredMedicines([])
    }
  }

  const debouncedSearch = debounce(handleSearch, 300)

  return {
    searchQuery,
    isSearching,
    filteredMedicines,
    handleSearch: debouncedSearch,
    isLoading,
    isError,
    error: queryError
  }
} 