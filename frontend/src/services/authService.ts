import { api } from './api';
import { User } from '../types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterData): Promise<{ user: User; token: string }> {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get('/auth/me');
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('doora_token');
    localStorage.removeItem('doora_user');
    localStorage.removeItem('doora_role');
  },
};