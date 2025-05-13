import axiosInstance from '@/lib/axiosInstance';
import { ScanAlert } from '@/type';

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





