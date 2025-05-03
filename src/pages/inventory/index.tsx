"use client"

import { Download, FileUp, Filter, Plus, Search, SlidersHorizontal, View, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SummaryCards } from "./components/SummaryCards"
import { InventoryTable } from "./components/InventoryTable"
import { useInventory } from "./hooks/useInventory"
import DashboardLayout from '@/components/layout/DashboardLayout'
import { ViewMedicineDialog } from "./components/ViewMedicineDialog"
import { useState } from "react"
import { AddMedicineDialog } from "./components/AddMedicine"
import { UpdateStockDialog } from "./components/UpdateStockDialog"
import { Medicine } from "../../type"
import Header from "@/components/layout/header"

export default function InventoryPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const {
    medicines,
    isLoading,
    isError,
    error,
    searchTerm,
    setSearchTerm,
    addDialogOpen,
    setAddDialogOpen,
    handleDelete,
    openUpdateStockDialog,
    isDeleting,
    deletingId,
    updateStockDialogOpen,
    setUpdateStockDialogOpen,
    selectedMedicine,
    setSelectedMedicine,
  } = useInventory()

  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null)

  const handleEditMedicine = (medicine: Medicine) => {
    setEditingMedicine(medicine)
    setAddDialogOpen(true)
  }

  const handleAddMedicine = () => {
    setEditingMedicine(null)
    setAddDialogOpen(true)
  }

  return (
    <DashboardLayout>
      <Header date={date} setDate={setDate} />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
          <Input
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px]"
          />
            <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
          <Button onClick={handleAddMedicine}>
            <Plus className="h-4 w-4 mr-2" />
            Add Medicine
          </Button>
        </div>

          <InventoryTable
            medicines={medicines}
            isLoading={isLoading}
            onDelete={handleDelete}
            onUpdateStock={openUpdateStockDialog}
          onView={(medicine) => {
            setSelectedMedicine(medicine)
            setViewDialogOpen(true)
          }}
          onEdit={handleEditMedicine}
            isDeleting={isDeleting}
            deletingId={deletingId}
          />

      <AddMedicineDialog
          open={addDialogOpen}
          onOpenChange={(open) => {
            setAddDialogOpen(open)
            if (!open) setEditingMedicine(null)
          }}
          medicine={editingMedicine}
          onSubmit={() => setEditingMedicine(null)}
      />

      <UpdateStockDialog
        open={updateStockDialogOpen}
        onOpenChange={setUpdateStockDialogOpen}
        medicine={selectedMedicine}
      />

        <ViewMedicineDialog
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          medicine={selectedMedicine}
        />
    </div>
    </DashboardLayout>
  )
} 