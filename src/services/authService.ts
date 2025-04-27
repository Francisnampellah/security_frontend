import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const AuthService = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  async getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async logout() {
    localStorage.removeItem('token');
  },

  async register(email: string, password: string, name: string) {
    const response = await axios.post(`${API_URL}/auth/register/`, {
      email,
      password,
      name
    });
    return response.data;
  },
};
