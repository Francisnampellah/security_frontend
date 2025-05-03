import axiosInstance from "@/lib/axiosInstance";
import { 
  User, 
  CreateUserDto, 
  UpdateUserDto, 
  LoginDto, 
  AuthResponse 
} from '../../types/user';


const userService = {
  // Register a new user
  async register(userData: CreateUserDto): Promise<User> {
    const response = await axiosInstance.post(`/users/register`, userData);
    return response.data;
  },

  // Login user
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const response = await axiosInstance.post(`/users/login`, credentials);
    return response.data;
  },

  // Get all users
  async getUsers(): Promise<User[]> {
    const response = await axiosInstance.get(`/users`);
    return response.data;
  },

  // Get user by ID
  async getUserById(id: number): Promise<User> {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  },

  // Update user
  async updateUser(id: number, userData: UpdateUserDto): Promise<User> {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  async deleteUser(id: number): Promise<void> {
    await axiosInstance.delete(`/users/${id}`);
  },

  // Set auth token for authenticated requests
  setAuthToken(token: string): void {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  },

  // Remove auth token
  removeAuthToken(): void {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default userService; 