"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SellSchema } from "../schema"
import { Medicine, Sell } from "../../../type"
import { useEffect } from "react"

interface SellDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  medicine: Medicine | null
  onSubmit: (values: { medicineId: number; quantity: number; totalPrice: string }) => void
}

export function SellDialog({ open, onOpenChange, medicine, onSubmit }: SellDialogProps) {
  const form = useForm<z.infer<typeof SellSchema>>({
    resolver: zodResolver(SellSchema),
    defaultValues: {
      quantity: "1",
      totalPrice: "",
    },
  })

  // Auto-calculate price when quantity changes
  useEffect(() => {
    if (medicine) {
      const quantity = Number(form.watch("quantity") || 1)
      const calculatedPrice = (Number(medicine.sellPrice) * quantity).toFixed(2)
      form.setValue("totalPrice", calculatedPrice)
    }
  }, [form.watch("quantity"), medicine, form])

  const handleSubmit = (values: z.infer<typeof SellSchema>) => {
    if (!medicine) return
    
    const quantity = Number(values.quantity)
    const totalPrice = values.totalPrice || (Number(medicine.sellPrice) * quantity).toFixed(2)
    
    onSubmit({
      medicineId: medicine.id,
      quantity,
      totalPrice,
    })
    onOpenChange(false)
  }

  if (!medicine) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sell {medicine.name}</DialogTitle>
          <DialogDescription>
            Enter the quantity to sell this medicine. Price per unit: ${Number(medicine.sellPrice).toFixed(2)}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="1"
                      max={medicine.stock?.quantity}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Sell</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 