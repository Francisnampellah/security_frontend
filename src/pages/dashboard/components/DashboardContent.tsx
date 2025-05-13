import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { useDashboard } from "../hooks/useDashboard"
import { formatCurrency } from "../../../utils/formatCurrency"
import StatisticsCard from '@/components/ui/StatisticsCard'

export const DashboardContent = () => {
  // const {
  //   totalRevenue,
  //   totalSales,
  //   totalInventory,
  //   totalPurchases,
  //   recentSells,
  //   monthlyRevenue,
  //   isLoading,
  //   isError
  // } = useDashboard()

  // if (isLoading) {
  //   return <div>Loading...</div>
  // }

  // if (isError) {
  //   return <div>Error loading dashboard data</div>
  // }

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
} 