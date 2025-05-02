import axiosInstance from "@/lib/axiosInstance";
import { Batch } from "../../type";

export const fetchBatches = async (): Promise<Batch[]> => {
  const response = await axiosInstance.get<Batch[]>('/batch/');
  return response.data;
};

export const createBatch = async (batch: Omit<Batch, 'id'>): Promise<Batch> => {
  const response = await axiosInstance.post<Batch>('/batch/', batch);
  return response.data;
};


export const updateBatch = async (id: number, batch: Batch): Promise<Batch> => {
  const response = await axiosInstance.put<Batch>(`/batch/${id}`, batch);
  return response.data;
};


export const deleteBatch = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/batch/${id}`);
};

export const getBatchById = async (id: number): Promise<Batch> => {
  const response = await axiosInstance.get<Batch>(`/batch/${id}`);
  return response.data;
};
