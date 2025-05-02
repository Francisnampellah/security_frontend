import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Medicine, Sell } from "../../../type"
import { fetchMedicines } from "../../../services/inventory"
import { createSell, getSells, deleteSell, updateSell } from "../../../services/sell"
import { useNotification } from "../../../hooks/useNotification"

interface CreateSellRequest {
  medicineId: number;
  quantity: number;
  totalPrice: string;
}

export function useSell() {
  const { success, error: showError } = useNotification()
  const [searchTerm, setSearchTerm] = useState("")
  const [sellDialogOpen, setSellDialogOpen] = useState(false)
  
  const queryClient = useQueryClient()
  
  // Fetch medicines with Tanstack Query
  const { data: medicines = [], isLoading, isError, error: queryError } = useQuery({
    queryKey: ['medicines'],
    queryFn: fetchMedicines,
  })
  
  // Sell mutation
  const sellMutation = useMutation({
    mutationFn: createSell,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] })
      success("Medicine sold", {
        description: "The medicine has been successfully sold.",
      })
    },
    onError: (error) => {
      showError("Failed to sell medicine", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      })
    },
  })

  const deleteSellMutation = useMutation({
    mutationFn: deleteSell,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] })
      success("Sell deleted", {
        description: "The sell has been successfully deleted.",
      })
    },
    onError: (error) => {
      showError("Failed to delete sell", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      })
    },
  })

  const updateSellMutation = useMutation({
    mutationFn: ({ id, sell }: { id: number; sell: Sell }) => updateSell(id, sell),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] })
      success("Sell updated", {
        description: "The sell has been successfully updated.",
      })
    },
    onError: (error) => {
      showError("Failed to update sell", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      })
    },
  })

  // Filter medicines based on search term
  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Function to handle sell
  const handleSell = (values: CreateSellRequest) => {
    sellMutation.mutate(values)
  }

  return {
    medicines: filteredMedicines,
    isLoading,
    isError,
    error: queryError,
    searchTerm,
    setSearchTerm,
    sellDialogOpen,
    setSellDialogOpen,
    handleSell,
    deleteSellMutation,
    updateSellMutation,
    sellMutation,
    isSelling: sellMutation.isPending,
    sellingId: sellMutation.variables?.medicineId,
  }
} 