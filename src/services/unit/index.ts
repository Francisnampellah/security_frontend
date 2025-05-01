import axiosInstance from "@/lib/axiosInstance";
import { Unit } from "../../type";

export const fetchUnits = async (): Promise<Unit[]> => {
  const response = await axiosInstance.get<Unit[]>('/unit/');
  return response.data;
};

export const deleteUnit = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/unit/${id}`);
};

export const addUnit = async (unit: any): Promise<Unit> => {
  const response = await axiosInstance.post<Unit>('/unit/', unit);
  return response.data;
};

export const updateUnit = async (id: number, name: string): Promise<Unit> => {
  const response = await axiosInstance.put<Unit>(`/unit/${id}`, { name });
  return response.data;
};