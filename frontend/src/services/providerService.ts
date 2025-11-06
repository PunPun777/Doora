import { api } from './api';
import { Service, SOSPost, ProviderMetrics } from '../types';

export interface CreateServiceData {
  title: string;
  description: string;
  rate: number;
  hashtags: string[];
}

export const providerService = {
  async createService(serviceData: CreateServiceData): Promise<Service> {
    const response = await api.post('/provider/services', serviceData);
    return response.data;
  },

  async getMyServices(): Promise<Service[]> {
    const response = await api.get('/provider/services');
    return response.data;
  },

  async getActiveSOSPosts(): Promise<SOSPost[]> {
    const response = await api.get('/provider/sos-posts');
    return response.data;
  },

  async getMetrics(): Promise<ProviderMetrics> {
    const response = await api.get('/provider/metrics');
    return response.data;
  },

  async claimSOSPost(sosId: string): Promise<void> {
    await api.post(`/provider/sos-posts/${sosId}/claim`);
  },
};