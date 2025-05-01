import { Medicine } from "../../type"
import axiosInstance from "@/lib/axiosInstance"

export const fetchMedicines = async (): Promise<Medicine[]> => {
  const response = await axiosInstance.get<Medicine[]>('/medicine/')
  return response.data
}

export const deleteMedicine = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/medicine/${id}`)
}

export const addMedicine = async (medicine: any): Promise<Medicine> => {
  const response = await axiosInstance.post<Medicine>('/medicine/', medicine)
  return response.data
}

export const updateStock = async ({ medicineId, quantity }: any): Promise<Medicine> => {
  const response = await axiosInstance.patch<Medicine>(`/stock/${medicineId}`, {
    quantity,
  })
  return response.data
}

export const getMedicineTemplate = async (): Promise<Blob> => {
  const response = await axiosInstance.get('/excel/medicine', {
    responseType: 'blob'
  });
  return response.data;
}

export const bulkUploadMedicines = async (file: File): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);
  await axiosInstance.post('/excel/bulk-upload/medicine', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export const updateMedicine = async (id: number, medicine: any): Promise<Medicine> => {
  const response = await axiosInstance.put<Medicine>(`/medicine/${id}`, medicine)
  return response.data
}