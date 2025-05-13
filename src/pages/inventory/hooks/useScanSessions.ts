import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getSpiderScanStatus, getActiveScanStatus, startActiveScan, getAlerts as fetchAlerts,fetchScanSessions, createScanSession, deleteScanSession,scan } from "@/services/scan"
import { ScanSession, ScanAlert } from "@/type"
import { toast } from "sonner"

export const useScanSessions = () => {
  const queryClient = useQueryClient()

  const { data: scanSessions = [], isLoading } = useQuery<ScanSession[]>({
    queryKey: ["scanSessions"],
    queryFn: fetchScanSessions,
  })


  const startSpiderScan = useMutation({
    mutationFn: (url: string) => scan(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
    },
    onError: (error) => {
      toast.error("Failed to start spider scan")
      console.error(error)
    },
  })

  const startActiveScan = useMutation({
    mutationFn: (url: string) => startActiveScan(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
    },
  })

  const CreateScanSession = useMutation({
    mutationFn: (sessionId: string) => createScanSession(sessionId), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
    },
    onError: (error) => {
      toast.error("Failed to get scan session")
      console.error(error)
    },
  })


  const updateSpiderScanStatus = useMutation({
    mutationFn: (spiderId: string) => getSpiderScanStatus(spiderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
    },
    onError: (error) => {
      toast.error("Failed to update spider scan status")
      console.error(error)
    },
  })

  const updateActiveScanStatus = useMutation({
    mutationFn: (activeId: string) => getActiveScanStatus(activeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
    },
    onError: (error) => {
      toast.error("Failed to update active scan status")
      console.error(error)
    },
  })

  const createSession = useMutation({
    mutationFn: createScanSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
      toast.success("Scan session created successfully")
    },
    onError: (error) => {
      toast.error("Failed to create scan session")
      console.error(error)
    },
  })

  const deleteSession = useMutation({
    mutationFn: deleteScanSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
      toast.success("Scan session deleted successfully")
    },
    onError: (error) => {
      toast.error("Failed to delete scan session")
      console.error(error)
    },
  })

  const getAlerts = useMutation<ScanAlert[], Error, string>({
    mutationFn: fetchAlerts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
    },
    onError: (error) => {
      toast.error("Failed to get alerts")
      console.error(error)
    },
  })

  return {
    scanSessions,
    isLoading,
    createSession,
    deleteSession,
    updateSpiderScanStatus,
    updateActiveScanStatus,
    startActiveScan,
    getAlerts,
    startSpiderScan
  }
} 