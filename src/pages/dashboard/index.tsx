"use client"

import { useState,useEffect } from "react"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Header from "@/components/layout/header"
import { ScanInput } from "./components/ScanInput"
import { getAllScans } from "@/services/scan"
import { VulnerabilitySummary } from "./components/vurnabilitysummary"
import { VulnerabilityTests } from "./components/test"
import { ScanningHelp } from "./components/ScanningHelp"
import { ScanOverview } from "./components/ScanOverview"
import type { ScanSession } from "@/type"

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [scanSessions, setScanSessions] = useState<ScanSession[]>([])

  useEffect(() => {
    const fetchScanSessions = async () => {
      const response = await getAllScans()
      setScanSessions(response.data)
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
      <div className="container mx-auto py-10">
        <div className="flex w-full justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <main className="flex-1">
          <ScanOverview scanSessions={scanSessions} />
          <div className="mt-6">
            <ScanningHelp />
          </div>
          {/* <VulnerabilitySummary />
          <VulnerabilityTests/> */}
        </main>
      </div>
    </DashboardLayout>
  )
}
