import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Medicine } from "../../../type"
import { fetchMedicines, deleteMedicine, addMedicine, updateStock, bulkUploadMedicines } from "../../../services/inventory"
import { bulkUpdateStock } from "../../../services/inventory/stockService"

export function useInventory() {

  const [searchTerm, setSearchTerm] = useState("")
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [updateStockDialogOpen, setUpdateStockDialogOpen] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  // const [openViewDialog, setOpenViewDialog] = useState(false)
  
  const queryClient = useQueryClient()
  
  // Fetch medicines with Tanstack Query
  const { data: medicines = [], isLoading, isError, error } = useQuery({
    queryKey: ['medicines'],
    queryFn: fetchMedicines,
  })
  
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteMedicine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] })
      toast.success("Medicine deleted", {
        description: "The medicine has been successfully deleted.",
      })
    },
    onError: (error) => {
      toast.error("Failed to delete medicine", {
        description: error.message,
      })
    },
  })
  
  // Add medicine mutation
  const addMutation = useMutation({
    mutationFn: addMedicine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] })
      toast.success("Medicine added", {
        description: "The new medicine has been successfully added.",
      })
    },
    onError: (error) => {
      toast.error("Failed to add medicine", {
        description: error.message,
      })
    },
  })
  
  // Update stock mutation
  const updateStockMutation = useMutation({
    mutationFn: updateStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] })
      toast.success("Stock updated", {
        description: "The stock has been successfully updated.",
      })
    },
    onError: (error) => {
      toast.error("Failed to update stock", {
        description: error.message,
      })
    },
  })

  // Bulk update stock mutation
  const bulkUpdateStockMutation = useMutation({
    mutationFn: bulkUpdateStock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] })
      toast.success("Stock updated", {
        description: "The stock has been successfully updated.",
      })
    },
    onError: (error) => {
      toast.error("Failed to update stock", {
        description: error.message,
      })
    },
  })

  // Bulk upload mutation
  const bulkUploadMutation = useMutation({
    mutationFn: bulkUploadMedicines,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medicines'] })
      toast.success("Bulk upload successful", {
        description: "Medicines have been uploaded successfully.",
      })
    },
    onError: (error) => {
      toast.error("Bulk upload failed", {
        description: error.message,
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

  // Function to handle delete
  const handleDelete = (id: number) => {
    console.log("Deletes")
    deleteMutation.mutate(id)
  }
  
  // Function to handle add medicine
  const handleAddMedicine = (values: any) => {
    addMutation.mutate(values)
  }
  
  // Function to handle update stock
  const handleUpdateStock = (values: {medicineId: Number, quantity: Number}) => {
    console.log("those any values",values)
 
      updateStockMutation.mutate({
        medicineId: values.medicineId,
        quantity: values.quantity,
      })
  }
  
  // Function to open update stock dialog
  const openUpdateStockDialog = (medicine: Medicine) => {
    setSelectedMedicine(medicine)
    setUpdateStockDialogOpen(true)
  }

  return {
    medicines: filteredMedicines,
    isLoading,
    isError,
    error,
    searchTerm,
    addMutation,
    updateStockMutation,
    filteredMedicines,
    setFilteredMedicines: setSearchTerm,
    setSearchTerm,
    addDialogOpen,
    bulkUpdateStockMutation,
    setAddDialogOpen,
    updateStockDialogOpen,
    setUpdateStockDialogOpen,
    selectedMedicine,
    handleDelete,
    handleAddMedicine,
    handleUpdateStock,
    openUpdateStockDialog,
    isDeleting: deleteMutation.isPending,
    deletingId: deleteMutation.variables as number,
    bulkUploadMutation,
  }
} 