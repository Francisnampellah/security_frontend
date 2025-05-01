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

export const getMedicineTemplate = async (): Promise<any> => {
  const response = await axiosInstance.get<Medicine>('/excel/medicine')
  console.log("Template", response.data)
  return response.data
}