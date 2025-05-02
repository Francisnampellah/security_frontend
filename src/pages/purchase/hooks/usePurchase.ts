import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Purchase } from "../../../type"
import { getPurchases, createPurchase, deletePurchase, updatePurchase } from "../../../services/purchase"
import { useNotification } from "../../../hooks/useNotification"

export function usePurchase() {
  const { success, error: showError } = useNotification()
  const [searchTerm, setSearchTerm] = useState("")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)
  
  const queryClient = useQueryClient()
  
  // Fetch purchases with Tanstack Query
  const { data: purchases = [], isLoading, isError, error: queryError } = useQuery({
    queryKey: ['purchases'],
    queryFn: getPurchases,
  })

  console.log('Fetched purchases:', purchases)
  
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deletePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
      success("Purchase deleted", {
        description: "The purchase has been successfully deleted.",
      })
    },
    onError: (error) => {
      showError("Failed to delete purchase", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      })
    },
  })
  
  // Add purchase mutation
  const addMutation = useMutation({
    mutationFn: createPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
      success("Purchase added", {
        description: "The new purchase has been successfully added.",
      })
    },
    onError: (error) => {
      showError("Failed to add purchase", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      })
    },
  })

  // Update purchase mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, purchase }: { id: number, purchase: any }) => updatePurchase(id, purchase),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] })
      success("Purchase updated", {
        description: "The purchase has been successfully updated.",
      })
    },
    onError: (error) => {
      showError("Failed to update purchase", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      })
    },
  })

  // Filter purchases based on search term
  const filteredPurchases = Array.isArray(purchases) ? purchases.filter(
    (purchase) =>
      purchase.medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.medicine.manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      purchase.medicine.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : []

  console.log('Filtered purchases:', filteredPurchases)

  // Function to handle delete
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id)
  }
  
  // Function to handle add purchase
  const handleAddPurchase = (values: any) => {
    addMutation.mutate(values)
  }

  return {
    purchases: filteredPurchases,
    isLoading,
    isError,
    error: queryError,
    searchTerm,
    setSearchTerm,
    addDialogOpen,
    setAddDialogOpen,
    selectedPurchase,
    setSelectedPurchase,
    updateMutation,
    handleDelete,
    handleAddPurchase,
    isDeleting: deleteMutation.isPending,
    deletingId: deleteMutation.variables as number,
  }
} 