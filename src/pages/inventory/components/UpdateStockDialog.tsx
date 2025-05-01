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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UpdateStockSchema } from "../schema"
import { useInventory } from "../hooks/useInventory"
import { Medicine } from "../../../type"
import { useState } from "react"
import { Download, Upload } from "lucide-react"
import { getStockUpdateTemplate } from "../../../services/inventory/stockService"
import { useNotification } from "../../../hooks/useNotification"

interface UpdateStockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  medicine: Medicine | null
}

export function UpdateStockDialog({ open, onOpenChange, medicine }: UpdateStockDialogProps) {
  const { handleUpdateStock, bulkUpdateStockMutation } = useInventory()
  const { error: showError } = useNotification()
  const [file, setFile] = useState<File | null>(null)

  const form = useForm<z.infer<typeof UpdateStockSchema>>({
    resolver: zodResolver(UpdateStockSchema),
    defaultValues: {
      quantity: "0",
    },
  })

  function handleSubmit(values: z.infer<typeof UpdateStockSchema>) {
    if (!medicine) return

    const quantity = Number.parseInt(values.quantity)

    handleUpdateStock({
      medicineId: medicine.id,
      quantity,
    })
    
    form.reset()
    onOpenChange(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleBulkSubmit = async () => {
    if (!file) {
      showError("No file selected", {
        description: "Please select a file to upload",
      })
      return
    }

    try {
      await bulkUpdateStockMutation.mutateAsync(file)
      setFile(null)
      onOpenChange(false)
    } catch (error) {
      showError("Failed to update stock", {
        description: error instanceof Error ? error.message : "Please check your file format",
      })
    }
  }

  const handleDownloadTemplate = async () => {
    try {
      const blob = await getStockUpdateTemplate();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'stock_update_template.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      showError("Failed to download template", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Stock</DialogTitle>
          <DialogDescription>
            {medicine ? `Update stock for ${medicine.name}. Current stock: ${medicine.stock?.quantity || 0} units` : "Update stock in bulk"}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={medicine ? "single" : "bulk"} className="w-full" onValueChange={() => form.reset()}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single" disabled={!medicine}>Single Update</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Update</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="mt-4">
            {medicine && (
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
            )}
          </TabsContent>

          <TabsContent value="bulk" className="mt-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleDownloadTemplate}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Template
                </Button>
              </div>

              <Form {...form}>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Excel File</FormLabel>
                        <FormControl>
                          <div className="flex flex-col gap-4">
                            <Input
                              type="file"
                              accept=".xlsx"
                              onChange={handleFileChange}
                              className="w-full"
                            />
                            {file && (
                              <p className="text-sm text-muted-foreground">
                                Selected file: {file.name}
                              </p>
                            )}
                            <Button
                              type="button"
                              onClick={handleBulkSubmit}
                              disabled={!file}
                              className="flex items-center gap-2 self-end"
                            >
                              <Upload className="h-4 w-4" />
                              Upload
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Form>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
              </DialogFooter>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
} 