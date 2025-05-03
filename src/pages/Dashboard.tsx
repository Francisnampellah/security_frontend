"use client"

import { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { format } from "date-fns"
import { CalendarIcon, Download, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Header from "@/components/layout/header"
import { MedicineSearchModal } from "@/components/MedicineSearchModal"

// Mock data for the dashboard
const data = [
  {
    name: "Jan",
    total: 1800,
  },
  {
    name: "Feb",
    total: 2200,
  },
  {
    name: "Mar",
    total: 2800,
  },
  {
    name: "Apr",
    total: 2400,
  },
  {
    name: "May",
    total: 2900,
  },
  {
    name: "Jun",
    total: 3500,
  },
  {
    name: "Jul",
    total: 3200,
  },
  {
    name: "Aug",
    total: 3800,
  },
  {
    name: "Sep",
    total: 4200,
  },
  {
    name: "Oct",
    total: 4500,
  },
  {
    name: "Nov",
    total: 4800,
  },
  {
    name: "Dec",
    total: 5200,
  },
]

const recentSales = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    amount: "$129.99",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    amount: "$89.50",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    amount: "$245.75",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    amount: "$42.25",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.wilson@example.com",
    amount: "$178.30",
    image: "/placeholder.svg?height=32&width=32",
  },
]

const medicineResults = [
  {
    id: "1",
    name: "Paracetamol 500mg",
    sku: "MED-P500",
    stock: 245,
    price: "$5.99",
  },
  {
    id: "2",
    name: "Amoxicillin 250mg",
    sku: "MED-A250",
    stock: 120,
    price: "$12.50",
  },
  {
    id: "3",
    name: "Ibuprofen 400mg",
    sku: "MED-I400",
    stock: 180,
    price: "$7.25",
  },
  {
    id: "4",
    name: "Cetirizine 10mg",
    sku: "MED-C010",
    stock: 95,
    price: "$8.99",
  },
  {
    id: "5",
    name: "Pantoprazole 40mg",
    sku: "MED-P040",
    stock: 75,
    price: "$15.75",
  },
]

export default function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [filteredMedicines, setFilteredMedicines] = useState(medicineResults)

  // Debounced search function
  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (query.length >= 2) {
      // In a real app, this would be an API call
      const results = medicineResults.filter(
        (medicine) =>
          medicine.name.toLowerCase().includes(query.toLowerCase()) ||
          medicine.sku.toLowerCase().includes(query.toLowerCase()),
      )
      setFilteredMedicines(results)
      setIsSearchModalOpen(true)
    } else {
      setIsSearchModalOpen(false)
    }
  }

  // Debounce implementation
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay)
    }
  }

  const debouncedSearch = debounce(handleSearch, 300)

  return (
    <DashboardLayout>
        <Header date={date} setDate={setDate} />
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1">
        <div className="container mx-auto  px-4 py-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative z-50 w-full md:w-2/3">
              <Button 
                onClick={() => setIsSearchModalOpen(true)}
                className="w-full md:w-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
                Sell
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="mb-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Total Revenue</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-500"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-green-500">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Subscriptions</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-500"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+2,350</div>
                <p className="text-xs text-green-500">+18.1% from last month</p>
              </CardContent>
            </Card>
            <Card className="transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Sales</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-500"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-green-500">+19% from last month</p>
              </CardContent>
            </Card>
            <Card className="transform transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">Active Now</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-gray-500"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-green-500">+201 since last hour</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Chart */}
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>Monthly revenue Jan-Dec</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} className="fill-primary" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sales */}
            <Card className="col-span-2 md:col-span-1">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>Latest transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={sale.image || "/placeholder.svg"} alt={sale.name} />
                        <AvatarFallback>{sale.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{sale.name}</p>
                        <p className="text-sm text-gray-500">{sale.email}</p>
                      </div>
                      <div className="ml-auto font-medium">{sale.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Medicine Search Modal */}
      <MedicineSearchModal
        isOpen={isSearchModalOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSearchQuery("")
            setFilteredMedicines(medicineResults)
          }
          setIsSearchModalOpen(open)
        }}
        searchQuery={searchQuery}
        onSearchChange={debouncedSearch}
        filteredMedicines={filteredMedicines}
        onMedicineSelect={(medicine) => {
          console.log(`Selected medicine: ${medicine.name}`)
          setIsSearchModalOpen(false)
        }}
      />
      
    </div>
    </DashboardLayout>
  )
}
