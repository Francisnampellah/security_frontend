import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
  import { Skeleton } from "@/components/ui/skeleton"
  import { Medicine } from "../../../type"

interface SummaryCardsProps {
  medicines: Medicine[]
  isLoading: boolean
}

export function SummaryCards({ medicines, isLoading }: SummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Items</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <div className="text-2xl font-bold">{medicines.length}</div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <div className="text-2xl font-bold">{medicines.filter((m) => m.stock && m.stock.quantity <= 0).length}</div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <div className="text-2xl font-bold">
              {medicines.filter((m) => m.stock && m.stock.quantity > 0 && m.stock.quantity < 10).length}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}