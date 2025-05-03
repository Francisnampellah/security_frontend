import { useSell } from "../../sell/hooks/useSell"
import { useInventory } from "../../inventory/hooks/useInventory"
import { usePurchase } from "../../purchase/hooks/usePurchase"
import { useQuery } from "@tanstack/react-query"
import { getSells } from "../../../services/sell"
import { getPurchases } from "../../../services/purchase"
import { fetchStock } from "../../../services/inventory/stockService"
import { formatCurrency } from "../../../utils/formatCurrency"

export function useDashboard() {
  const { sells = [] } = useSell()
  const { medicines = [] } = useInventory()
  const { purchases = [] } = usePurchase()

  // Calculate total revenue from sells
  const totalRevenue = sells.reduce((sum, sell) => sum + Number(sell.totalPrice), 0)

  // Calculate total sales count
  const totalSales = sells.length

  // Calculate total inventory value
  const totalInventory = medicines.reduce((sum, medicine) => {
    const stock = medicine.stock?.quantity || 0
    const price = Number(medicine.sellPrice)
    return sum + (stock * price)
  }, 0)

  // Calculate total purchases value
  const totalPurchases = purchases.reduce((sum, purchase) => {
    const cost = Number(purchase.costPerUnit)
    return sum + (cost * purchase.quantity)
  }, 0)

  // Get recent sells for the dashboard
  const recentSells = sells.slice(0, 5).map(sell => ({
    id: sell.id.toString(),
    name: sell.medicine.name,
    Quantity:sell.quantity,
    unit:sell.medicine.unit.name,
    email: sell.user.email,
    amount: formatCurrency(sell.totalPrice),
    image: "/placeholder.svg?height=32&width=32",
  }))

  // Calculate monthly revenue data for the chart
  const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
    const month = new Date()
    month.setMonth(i)
    const monthSells = sells.filter(sell => {
      const sellDate = new Date(sell.createdAt)
      return sellDate.getMonth() === i && sellDate.getFullYear() === new Date().getFullYear()
    })
    const revenue = monthSells.reduce((sum, sell) => sum + Number(sell.totalPrice), 0)
    return {
      name: month.toLocaleString('default', { month: 'short' }),
      total: revenue
    }
  })

  return {
    totalRevenue,
    totalSales,
    totalInventory,
    totalPurchases,
    recentSells,
    monthlyRevenue,
    isLoading: false, // You might want to track loading states from individual hooks
    isError: false, // You might want to track error states from individual hooks
  }
} 