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
import { PurchaseTable } from "./components/PurchaseTable"
import { usePurchase } from "./hooks/usePurchase"
import DashboardLayout from '@/components/layout/DashboardLayout'
import { ViewPurchaseDialog } from "./components/ViewPurchaseDialog"
import { useState } from "react"
import { AddPurchaseDialog } from "./components/AddPurchaseDialog"
import { Purchase } from "../../type"
import Header from '@/components/layout/header'

export default function PurchasePage() {
  const {
    purchases,
    isLoading,
    isError,
    error,
    searchTerm,
    setSearchTerm,
    addDialogOpen,
    setAddDialogOpen,
    handleDelete,
    isDeleting,
    deletingId,
  } = usePurchase()

  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())

  const handleEditPurchase = (purchase: Purchase) => {
    setEditingPurchase(purchase)
    setAddDialogOpen(true)
  }

  const handleAddPurchase = () => {
    setEditingPurchase(null)
    setAddDialogOpen(true)
  }

  return (
    <DashboardLayout>
      <Header Title='Purchase Management'  setDate={setDate} date={date}/>
      <div className="space-y-4">


        <PurchaseTable
          purchases={purchases}
          isLoading={isLoading}
          onDelete={handleDelete}
          onView={(purchase) => {
            setSelectedPurchase(purchase)
            setViewDialogOpen(true)
          }}
          onEdit={handleEditPurchase}
          isDeleting={isDeleting}
          deletingId={deletingId}
        />

        <AddPurchaseDialog
          open={addDialogOpen}
          onOpenChange={(open) => {
            setAddDialogOpen(open)
            if (!open) setEditingPurchase(null)
          }}
          purchase={editingPurchase}
          onSubmit={() => setEditingPurchase(null)}
        />

        <ViewPurchaseDialog
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
          purchase={selectedPurchase}
        />
      </div>
    </DashboardLayout>
  )
}
