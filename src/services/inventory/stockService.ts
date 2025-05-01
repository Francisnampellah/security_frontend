import axiosInstance from '../../lib/axiosInstance';
import { Medicine } from '../../type';

export const fetchStock = async () => {
  const response = await axiosInstance.get('/stock');
  return response.data;
};

export const fetchStockByMedicineId = async (medicineId: number) => {
  const response = await axiosInstance.get(`/stock/medicine/${medicineId}`);
  return response.data;
};

export const updateStock = async (medicineId: number, quantity: number) => {
  const response = await axiosInstance.put(`/stock/medicine/${medicineId}`, { quantity });
  return response.data;
};

export const adjustStock = async (medicineId: number, adjustment: number) => {
  const response = await axiosInstance.patch(`/stock/medicine/${medicineId}/adjust`, { adjustment });
  return response.data;
};