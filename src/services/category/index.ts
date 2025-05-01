import axios from '../../lib/axiosInstance';
import { Category } from '../../type';

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await axios.get('/category');
  return response.data;
};

export const fetchCategoryById = async (id: number): Promise<Category> => {
  const response = await axios.get(`/category/${id}`);
  return response.data;
};

export const createCategory = async (category: Partial<Category>): Promise<Category> => {
  const response = await axios.post('/category', category);
  return response.data;
};

export const updateCategory = async (id: number, category: Partial<Category>): Promise<Category> => {
  const response = await axios.put(`/category/${id}`, category);
  return response.data;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await axios.delete(`/category/${id}`);
};