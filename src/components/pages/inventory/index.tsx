"use client"

import { Download, FileUp, Filter, Plus, Search, SlidersHorizontal } from 'lucide-react'
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

export default function InventoryPage() {
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
  } = useInventory()

  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState(null)

  const handleViewMedicine = (medicine) => {
    setSelectedMedicine(medicine)
    setViewDialogOpen(true)
  }

  return (
    <DashboardLayout>
    <div className="w-full space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
          <p className="text-muted-foreground">Manage your medicine inventory, stock levels, and pricing</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => setAddDialogOpen(true)} className="bg-primary hover:bg-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            Add Medicine
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-input hover:bg-accent hover:text-accent-foreground">
                <FileUp className="mr-2 h-4 w-4" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" />
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" />
                Export as Excel
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Download className="mr-2 h-4 w-4" />
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <SummaryCards medicines={medicines} isLoading={isLoading} />

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button variant="outline" size="sm" className="h-10 px-4">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 px-4">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="h-10 px-4">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            View
          </Button>
        </div>
      </div>

      {/* Error state */}
      {isError && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-destructive" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-destructive">Error loading inventory data</h3>
              <p className="text-sm text-destructive/80">
                {error instanceof Error ? error.message : "An unknown error occurred"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <Card className="overflow-hidden border border-border/50 shadow-sm">
        <CardContent className="p-0">
          <InventoryTable
            medicines={medicines}
            isLoading={isLoading}
            onDelete={handleDelete}
            onUpdateStock={openUpdateStockDialog}
            onView={handleViewMedicine}
            isDeleting={isDeleting}
            deletingId={deletingId}
          />
        </CardContent>
      </Card>

      {/* View Medicine Dialog */}
      <ViewMedicineDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        medicine={selectedMedicine}
      />
    </div>
    </DashboardLayout>
  )
} 