import axiosInstance from '@/lib/axiosInstance';

const API_URL = import.meta.env.VITE_API_URL;

export const AuthService = {
  async login(email: string, password: string) {
    const response = await axiosInstance.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  async getCurrentUser() {
    const response = await axiosInstance.get(`${API_URL}/auth/me`);
    return response.data;
  },

  async logout() {
    await axiosInstance.post(`${API_URL}/auth/logout`);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  async register(email: string, password: string, name: string) {
    const response = await axiosInstance.post(`${API_URL}/auth/register`, {
      email,
      password,
      name
    });
    return response.data;
  },

  async refreshToken(refreshToken: string) {
    const response = await axiosInstance.post(`${API_URL}/auth/refresh`, {
      refreshToken
    });
    return response.data;
  }
};
