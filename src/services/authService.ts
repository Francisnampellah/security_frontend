import axiosInstance from '@/lib/axiosInstance';
import { useNotification } from '@/hooks/useNotification';

// const API_URL = import.meta.env.VITE_API_URL;

export const AuthService = {

  
  async login(email: string, password: string) {
    const response = await axiosInstance.post(`/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  async getCurrentUser() {
    const response = await axiosInstance.get(`/auth/me`);
    return response.data;
  },

  async logout() {
    await axiosInstance.post(`/auth/logout`);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  async register(email: string, password: string) {
    const response = await axiosInstance.post(`/auth/register`, {
      email,
      password
    });
    return response.data;
  },

  async refreshToken(refreshToken: string) {
    const response = await axiosInstance.post(`/auth/refresh`, {
      refreshToken
    });
    return response.data;
  }
};
