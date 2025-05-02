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

export const updateStock = async ({ medicineId, quantity, batchId }: { medicineId: number; quantity: number; batchId: number }) => {
  const response = await axiosInstance.patch(`/stock/${medicineId}`, {
    quantity,
    batchId,
  });
  return response.data;
};

export const adjustStock = async (medicineId: number, adjustment: number) => {
  const response = await axiosInstance.patch(`/stock/medicine/${medicineId}/adjust`, { adjustment });
  return response.data;
};

export const getStockUpdateTemplate = async (): Promise<Blob> => {
  const response = await axiosInstance.get('/excel-stock/stock', {
    responseType: 'blob'
  });
  return response.data;
};

export const bulkUpdateStock = async (formData: FormData) => {
  const response = await axiosInstance.post('/excel-stock/bulk-upload/stock', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const fetchBatches = async () => {
  const response = await axiosInstance.get('/batch');
  return response.data;
};
