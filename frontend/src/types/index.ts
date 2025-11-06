export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  rating: number;
  distance: number;
  category: string;
  hashtags: string[];
  rate: number; // hourly rate or fixed price
  provider: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
}

export interface SOSPost {
  id: string;
  userId: string; // Add this line
  userName: string;
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  expiryTimestamp: Date;
  createdAt: Date;
  status: 'active' | 'expired' | 'resolved';
  tags: string[];
  contactInfo?: {
    phone?: string;
    email?: string;
  };
}
export interface Chat {
  id: string;
  participants: User[];
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
}

export interface SearchFilters {
  hashtags?: string[];
  maxDistance: number;
  minRating: number;
  sortBy: 'distance' | 'rating';
  category?: string;
  urgency?: string[];
}

export interface SOSFilters {
  urgency?: string[];
  category?: string;
  radius: number;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface Message {
  id: string;
  chatId: string;
  sender: User;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'location';
}

export interface ProviderMetrics {
  skillsShared: number;
  jobsDone: number;
  positiveRatings: number;
  communityScore: number;
  badges: {
    peerVerified: boolean;
    collegeVerified: boolean;
    neighborhoodVerified: boolean;
  };
}

export type UserRole = 'provider' | 'seeker' | null;