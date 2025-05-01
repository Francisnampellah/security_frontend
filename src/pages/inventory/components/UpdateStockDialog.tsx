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
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UpdateStockSchema } from "../schema"
import { useInventory } from "../hooks/useInventory"
import { Medicine } from "../../../type"

interface UpdateStockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  medicine: Medicine | null
}

export function UpdateStockDialog({ open, onOpenChange, medicine }: UpdateStockDialogProps) {
  if (!medicine) return null

  const { handleUpdateStock } = useInventory()

  const form = useForm<z.infer<typeof UpdateStockSchema>>({
    resolver: zodResolver(UpdateStockSchema),
    defaultValues: {
      quantity: "0",
    },
  })

  function handleSubmit(values: z.infer<typeof UpdateStockSchema>) {
    console.log("submitted")

    const quantity = Number.parseInt(values.quantity)

    console.log({
      medicineId: medicine.id,
      quantity,
    })

    handleUpdateStock({
      medicineId: medicine.id,
      quantity,
    })
    
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Stock - {medicine.name}</DialogTitle>
          <DialogDescription>
            Update the stock quantity for this medicine. Current stock: {medicine.stock?.quantity || 0} units
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
                    <Input type="number" min="0" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Stock</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 