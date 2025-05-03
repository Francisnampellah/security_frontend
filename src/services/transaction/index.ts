import axiosInstance from '@/lib/axiosInstance';
import { Transaction, CreateTransactionData, GetTransactionsParams } from '@/type';

interface UpdateTransactionData extends Partial<CreateTransactionData> {
  id: number;
}

const transactionApi = {
  create: async (data: CreateTransactionData): Promise<Transaction> => {
    const response = await axiosInstance.post(`/transactions`, data);
    return response.data.data;
  },

  getAll: async (params?: GetTransactionsParams): Promise<Transaction[]> => {
    const response = await axiosInstance.get(`/transactions`, { params });
    return response.data.data;
  },

  getById: async (id: number): Promise<Transaction> => {
    const response = await axiosInstance.get(`/transactions/${id}`);
    return response.data.data;
  },

  update: async (id: number, data: UpdateTransactionData): Promise<Transaction> => {
    const response = await axiosInstance.put(`/transactions/${id}`, data);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/transactions/${id}`);
  }
};

export default transactionApi; 