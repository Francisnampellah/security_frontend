"use client"

import { Search, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import DashboardLayout from '@/components/layout/DashboardLayout'
import { SellTable } from "./components/SellTable"
import { useSell } from "./hooks/useSell"
import { useState } from "react"
import { SellDialog } from "./components/SellDialog"
import { Medicine, Sell } from "../../type"
import Header from '@/components/layout/header'

export default function SellPage() {
  const {
    medicines,
    sells, // Ensure 'sells' is included here
    isLoading,
    isError,
    error,
    searchTerm,
    setSearchTerm,
    sellDialogOpen,
    setSellDialogOpen,
    handleSell,
    isSelling,
    sellingId,
  } = useSell()

  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null)
  const [date, setDate] = useState<Date | undefined>(new Date())


  const handleOpenSellDialog = (medicine: Medicine) => {
    setSelectedMedicine(medicine)
    setSellDialogOpen(true)
  }

  const handleView = (sell: Sell) => {
    setSellDialogOpen(true)
  }

  return (
    <DashboardLayout>
      <Header Title='Sell Management' date={date} setDate={setDate}/>
      <div className="space-y-4">
        {/* <div className="flex items-center justify-between">
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
        </div> */}
        <SellTable
          sells={sells}
          isLoading={isLoading}
          onView={handleView}
          onsell={handleOpenSellDialog}
          isSelling={isSelling}
          sellingId={sellingId}
          
        />

        <SellDialog
          open={sellDialogOpen}
          onOpenChange={setSellDialogOpen}
          medicine={selectedMedicine}
          onSubmit={handleSell}
        />
      </div>
    </DashboardLayout>
  )
} 