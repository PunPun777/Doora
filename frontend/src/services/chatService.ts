import { api } from './api';
import { Chat, Message } from '../types';

export interface SendMessageData {
  chatId: string;
  content: string;
  type: 'text' | 'image' | 'location';
}

export const chatService = {
  async getChats(): Promise<Chat[]> {
    const response = await api.get('/chats');
    return response.data;
  },

  async getMessages(chatId: string): Promise<Message[]> {
    const response = await api.get(`/chats/${chatId}/messages`);
    return response.data;
  },

  async sendMessage(messageData: SendMessageData): Promise<Message> {
    const response = await api.post('/chats/messages', messageData);
    return response.data;
  },

  async startChat(participantId: string): Promise<Chat> {
    const response = await api.post('/chats/start', { participantId });
    return response.data;
  },

  async initiateCall(chatId: string): Promise<{ callId: string }> {
    const response = await api.post(`/chats/${chatId}/call`);
    return response.data;
  },
};