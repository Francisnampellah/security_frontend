import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getSpiderScanStatus, getActiveScanStatus, startActiveScan, getAlerts as fetchAlerts,fetchScanSessions, createScanSession, deleteScanSession,scan } from "@/services/scan"
import { ScanSession, ScanAlert } from "@/type"
import { useNotification } from "@/hooks/useNotification"

export const useScanSessions = () => {
  const queryClient = useQueryClient()
  const { success, error: showError } = useNotification()

  const { data: scanSessions = [], isLoading } = useQuery<ScanSession[]>({
    queryKey: ["scanSessions"],
    queryFn: fetchScanSessions,
  })

  const startSpiderScan = useMutation({
    mutationFn: (url: string) => scan(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
      success("Spider scan started successfully")
    },
    onError: (err) => {
      showError("Failed to start spider scan")
      console.error(err)
    },
  })

  const startActiveScan = useMutation({
    mutationFn: (url: string) => startActiveScan(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
      success("Active scan started successfully")
    },
    onError: (err) => {
      showError("Failed to start active scan")
      console.error(err)
    },
  })

  const CreateScanSession = useMutation({
    mutationFn: (sessionId: string) => createScanSession(sessionId), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
      success("Scan session created successfully")
    },
    onError: (err) => {
      showError("Failed to create scan session")
      console.error(err)
    },
  })

  const updateSpiderScanStatus = useMutation({
    mutationFn: (spiderId: string) => getSpiderScanStatus(spiderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
      // success("Spider scan status updated")
    },
    onError: (err) => {
      showError("Failed to update spider scan status")
      console.error(err)
    },
  })

  const updateActiveScanStatus = useMutation({
    mutationFn: (activeId: string) => getActiveScanStatus(activeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
      // success("Active scan status updated")
    },
    onError: (err) => {
      showError("Failed to update active scan status")
      console.error(err)
    },
  })

  const createSession = useMutation({
    mutationFn: createScanSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
      success("Scan session created successfully")
    },
    onError: (err) => {
      showError("Failed to create scan session")
      console.error(err)
    },
  })

  const deleteSession = useMutation({
    mutationFn: deleteScanSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
      success("Scan session deleted successfully")
    },
    onError: (err) => {
      showError("Failed to delete scan session")
      console.error(err)
    },
  })

  const getAlerts = useMutation<ScanAlert[], Error, string>({
    mutationFn: fetchAlerts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scanSessions"] })
      success("Alerts retrieved successfully")
    },
    onError: (err) => {
      showError("Failed to get alerts")
      console.error(err)
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