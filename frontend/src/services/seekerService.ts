import { api } from './api';
import { Service, SOSPost } from '../types';

export interface CreateSOSData {
  title: string;
  description: string;
  duration: number;
}

export interface SearchFilters {
  hashtags?: string[];
  maxDistance?: number;
  minRating?: number;
  sortBy?: 'distance' | 'rating';
}

export const seekerService = {
  async searchServices(filters: SearchFilters = {}): Promise<Service[]> {
    const response = await api.get('/seeker/services', { params: filters });
    return response.data;
  },

  async createSOSPost(sosData: CreateSOSData): Promise<SOSPost> {
    const response = await api.post('/seeker/sos-posts', sosData);
    return response.data;
  },

  async getMySOSPosts(): Promise<SOSPost[]> {
    const response = await api.get('/seeker/sos-posts');
    return response.data;
  },

  async cancelSOSPost(sosId: string): Promise<void> {
    await api.delete(`/seeker/sos-posts/${sosId}`);
  },
};