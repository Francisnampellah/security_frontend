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
import { Medicine, Batch } from "../../../type"
import { useState } from "react"
import { Download, Upload } from "lucide-react"
import { getStockUpdateTemplate, fetchBatches } from "../../../services/inventory/stockService"
import { useNotification } from "../../../hooks/useNotification"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import CreatableSelect from "react-select/creatable"
import { createBatch } from "../../../services/batch"

interface UpdateStockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  medicine: Medicine | null
}

type CreateBatchPayload = Omit<Batch, 'id'>

export function UpdateStockDialog({ open, onOpenChange, medicine }: UpdateStockDialogProps) {
  const { handleUpdateStock, bulkUpdateStockMutation } = useInventory()
  const { error: showError, success: showSuccess } = useNotification()
  const [file, setFile] = useState<File | null>(null)
  const [selectedBatchId, setSelectedBatchId] = useState<string>("")
  const queryClient = useQueryClient()

  const { data: batches = [], isLoading: isLoadingBatches } = useQuery({
    queryKey: ['batches'],
    queryFn: fetchBatches,
  })

  const createBatchMutation = useMutation({
    mutationFn: createBatch,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['batches'] })
      showSuccess("Batch created successfully")
      setSelectedBatchId(response.id?.toString() || "")
    },
    onError: (error) => {
      showError("Failed to create batch", {
        description: error instanceof Error ? error.message : "An unknown error occurred"
      })
    }
  })

  const handleCreateBatch = async (inputValue: string) => {
    try {
      const response = await createBatchMutation.mutateAsync({
        note: inputValue,
        purchaseDate: new Date().toISOString()
      } as CreateBatchPayload)
      
      // Auto-select the newly created batch
      if (response?.id) {
        form.setValue('batchId', response.id.toString())
      }
    } catch (error) {
      console.error("Error creating batch:", error)
    }
  }

  const form = useForm<z.infer<typeof UpdateStockSchema>>({
    resolver: zodResolver(UpdateStockSchema),
    defaultValues: {
      quantity: "0",
      batchId: "",
      pricePerUnit: "0",
    },
  })

  function handleSubmit(values: z.infer<typeof UpdateStockSchema>) {
    if (!medicine) return

    const quantity = Number.parseInt(values.quantity || "0")
    const batchId = Number.parseInt(values.batchId || "0")
    const pricePerUnit = Number.parseFloat(values.pricePerUnit || "0")

    handleUpdateStock({
      medicineId: medicine.id,
      quantity,
      batchId,
      pricePerUnit,
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

    if (!selectedBatchId) {
      showError("No batch selected", {
        description: "Please select a batch for the bulk update",
      })
      return
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('batchId', selectedBatchId);
      await bulkUpdateStockMutation.mutateAsync(formData);
      setFile(null)
      setSelectedBatchId("")
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

  // Convert batches to format required by react-select
  const batchOptions = Array.isArray(batches.data) 
    ? batches.data.map((batch) => ({
        value: batch.id?.toString() || "",
        label: `Batch #${batch.id || ""} - ${new Date(batch.purchaseDate || new Date()).toLocaleDateString()}`,
      }))
    : [];

  console.log('Batch options:', batchOptions);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] space-y-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Update Stock</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {medicine ? `Update stock for ${medicine.name}. Current stock: ${medicine.stock?.quantity || 0} units` : "Update stock in bulk"}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={medicine ? "single" : "bulk"} className="w-full space-y-6" onValueChange={() => form.reset()}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single" disabled={!medicine}>Single Update</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Update</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="space-y-6">
            {medicine && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="batchId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Batch</FormLabel>
                        <FormControl>
                          <CreatableSelect
                            options={batchOptions}
                            value={batchOptions.find(option => option.value === field.value)}
                            onChange={(option) => field.onChange(option?.value || "")}
                            onCreateOption={handleCreateBatch}
                            placeholder="Select or create a batch"
                            className="w-full"
                            isLoading={isLoadingBatches || createBatchMutation.isPending}
                            isClearable
                            noOptionsMessage={() => "No batches found. Create a new one."}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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

                  <FormField
                    control={form.control}
                    name="pricePerUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per Unit</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Update Stock</Button>
                  </DialogFooter>
                </form>
              </Form>
            )}
          </TabsContent>

          <TabsContent value="bulk" className="space-y-6">
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

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Batch</label>
                  <CreatableSelect
                    options={batchOptions}
                    value={batchOptions.find(option => option.value === selectedBatchId)}
                    onChange={(option) => setSelectedBatchId(option?.value || "")}
                    onCreateOption={handleCreateBatch}
                    placeholder="Select or create a batch"
                    className="w-full"
                    isLoading={isLoadingBatches}
                    isClearable
                    noOptionsMessage={() => "No batches found. Create a new one."}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Upload Excel File</label>
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
                      disabled={!file || !selectedBatchId}
                      className="flex items-center gap-2 self-end"
                    >
                      <Upload className="h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-end space-x-2">
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