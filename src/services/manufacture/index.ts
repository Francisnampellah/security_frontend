import axiosInstance from "@/lib/axiosInstance";
import { Manufacturer } from "../../type/";

export const fetchManufacturers = async (): Promise<Manufacturer[]> => {
  const response = await axiosInstance.get<Manufacturer[]>('/manufacture/');
  return response.data;
};

export const deleteManufacturer = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/manufacture/${id}`);
};

export const addManufacturer = async (manufacturer: any): Promise<Manufacturer> => {
  const response = await axiosInstance.post<Manufacturer>('/manufacture/', manufacturer);
  return response.data;
};

export const updateManufacturer = async (id: number, name: string): Promise<Manufacturer> => {
  const response = await axiosInstance.put<Manufacturer>(`/manufacture/${id}`, { name });
  return response.data;
};