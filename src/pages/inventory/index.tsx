import { useState } from "react"
import { useScanSessions } from "./hooks/useScanSessions"
import { ScanTable } from "./components/ScanTable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import DashboardLayout from "@/components/layout/DashboardLayout"

interface CreateScanSessionForm {
  url: string
}

export default function ScanSessionsPage() {
  const { scanSessions, isLoading, createSession } = useScanSessions()
  const [open, setOpen] = useState(false)


  console.log(scanSessions)

  const form = useForm<CreateScanSessionForm>({
    defaultValues: {
      url: "",
    },
  })

  const onSubmit = (data: CreateScanSessionForm) => {
    createSession.mutate(data.url, {
      onSuccess: () => {
        setOpen(false)
        form.reset()
      },
    })
  }

  return (
    <DashboardLayout>
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Scan Sessions</h1>
        {/* <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Scan Session
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Scan Session</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Create Session
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog> */}
      </div>

      <ScanTable data={scanSessions} isLoading={isLoading} />
    </div>
    </DashboardLayout>
  )
} 