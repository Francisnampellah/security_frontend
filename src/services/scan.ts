import axiosInstance from '@/lib/axiosInstance';
import { ScanAlert } from '@/type';
import { Medicine, ScanSession } from "../type"

export const scan = async (url: string) => {
  const response = await axiosInstance.post("/scan/spider/start", { url });
  return response.data;
};

export const startActiveScan = async (url: string) => {
  const response = await axiosInstance.post("/scan/active/start", { url });
  return response.data;
};

export const getAlerts = async (url: string): Promise<ScanAlert[]> => {
  const response = await axiosInstance.get<{ alerts: ScanAlert[] }>(`/scan/alerts?baseUrl=${url}`);
  return response.data.alerts;
};

export const getSpiderScanStatus = async (scanId: string) => {
  const response = await axiosInstance.get(`/scan/spider/status/${scanId}`);
  return response.data;
};

export const getActiveScanStatus = async (scanId: string) => {
  const response = await axiosInstance.get(`/scan/active/status/${scanId}`);
  return response.data;
};

export const getAllScanSessions = async () => {
  const response = await axiosInstance.get("/scan/scan-sessions");
  return response.data;
};

export const getScanResults = async (scanId: string) => {
  const response = await axiosInstance.get(`/api/zap/spider/scan/${scanId}`);
  return response.data;
};

export const fetchScanSessions = async (): Promise<ScanSession[]> => {
  const response = await axiosInstance.get<ScanSession[]>('/scan/scan-sessions')
  return response.data
}

export const createScanSession = async (url: string): Promise<ScanSession> => {
  const response = await axiosInstance.post<ScanSession>('/scan-sessions', { url })
  return response.data
}

export const getScanSession = async (id: number): Promise<ScanSession> => {
  const response = await axiosInstance.get<ScanSession>(`/scan-sessions/${id}`)
  return response.data
}

export const deleteScanSession = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/scan-sessions/${id}`)
}





