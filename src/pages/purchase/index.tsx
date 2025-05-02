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
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {/* <div className="flex items-center space-x-2">
            <Input
              placeholder="Search purchases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px]"
            />
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div> */}
        </div>

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
