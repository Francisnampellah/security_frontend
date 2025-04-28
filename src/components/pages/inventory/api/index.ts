import { Medicine } from "../types"
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

export const updateStock = async ({ medicineId, operation, quantity, notes }: any): Promise<Medicine> => {
  const response = await axiosInstance.patch<Medicine>(`/medicine/${medicineId}/stock`, {
    operation,
    quantity,
    notes,
  })
  return response.data
} 