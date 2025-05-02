import axiosInstance from "@/lib/axiosInstance";
import { Purchase } from "../../type";
import { updateStock } from "../inventory/stockService";

export const createPurchase = async (purchase: Purchase): Promise<Purchase> => {
  const response = await axiosInstance.post<Purchase>('/purchase/', purchase);
  return response.data;
};

export const getPurchases = async (): Promise<Purchase[]> => {
  const response = await axiosInstance.get<{ success: boolean; data: Purchase[] }>('/purchase/');
  return response.data.data;
};

export const getPurchaseById = async (id: number): Promise<Purchase> => {
  const response = await axiosInstance.get<Purchase>(`/purchase/${id}`);
  return response.data;
};

export const getPurchasesByMedicine = async (medicineId: number): Promise<Purchase[]> => {
  const response = await axiosInstance.get<Purchase[]>(`/purchase/medicine/${medicineId}`);
  return response.data;
};

export const deletePurchase = async (id: number): Promise<Purchase> => {
  // First get the purchase details to know how much stock to adjust  
  // Delete the purchase
  const response = await axiosInstance.delete(`/purchase/${id}`);
  return response.data;
  
};

export const updatePurchase = async (id: number, purchase: Purchase): Promise<Purchase> => {
  // Get the current purchase to calculate stock difference  
  // Update the purchase
  const response = await axiosInstance.put(`/purchase/${id}`, purchase);
  return response.data;
};


