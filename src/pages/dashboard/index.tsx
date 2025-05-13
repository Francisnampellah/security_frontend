"use client"

import { useState,useEffect } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Header from "@/components/layout/header"
import { SearchBar } from "./components/SearchBar"
import { getAllScanSessions } from "@/services/scan"
import { VulnerabilitySummary } from "./components/vurnabilitysummary"
import { VulnerabilityTests } from "./components/test"

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [scanSessions, setScanSessions] = useState<any[]>([])

  useEffect(() => {
    const fetchScanSessions = async () => {
      const sessions = await getAllScanSessions()
      setScanSessions(sessions)
    }
    fetchScanSessions()
  }, [])

  console.log(scanSessions)

  const handleSell = (data: { medicineId: number; quantity: number; price: number }) => {
    // TODO: Implement sell logic
    console.log('Selling medicine:', data)
  }

  return (
    <DashboardLayout>
      <Header date={date} setDate={setDate} />
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-6">
            <SearchBar  />
            <VulnerabilitySummary />
            <VulnerabilityTests/>
          </div>
        </main>
      </div>
    </DashboardLayout>
  )
}
