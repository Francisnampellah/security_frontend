import axiosInstance from "@/lib/axiosInstance";
import { Sell } from "../../type";

interface CreateSellRequest {
  medicineId: number;
  quantity: number;
  totalPrice: string;
}

export const createSell = async (sell: CreateSellRequest): Promise<Sell> => {
  const response = await axiosInstance.post<Sell>('/sell/', {
    medicineId: sell.medicineId,
    quantity: sell.quantity,
    price: sell.totalPrice
  });
  return response.data;
};

export const getSells = async (): Promise<Sell[]> => {
  const response = await axiosInstance.get<Sell[]>('/sell/');
  return response.data.sells;
};

export const getSellById = async (id: number): Promise<Sell> => {
  const response = await axiosInstance.get<Sell>(`/sell/${id}`);
  return response.data;
};


export const deleteSell = async (id: number): Promise<Sell> => {
  const response = await axiosInstance.delete<Sell>(`/sell/${id}`);
  return response.data;
};


export const updateSell = async (id: number, sell: Sell): Promise<Sell> => {
  const response = await axiosInstance.put<Sell>(`/sell/${id}`, sell);
  return response.data;
};


