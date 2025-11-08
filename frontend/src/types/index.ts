export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  phone?: string;
  role?: 'provider' | 'seeker'; 
  userType?: 'provider' | 'seeker';
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

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'provider' | 'seeker';
  content: string;
  timestamp: Date;
  messageType: 'text' | 'image' | 'location' | 'sos_alert' | 'call_request';
  read: boolean;
  metadata?: {
    callType?: 'audio' | 'video';
    callDuration?: number;
    anonymous?: boolean;
  };
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participants: {
    id: string;
    name: string;
    role: 'provider' | 'seeker';
    avatar?: string;
    phoneNumber?: string; // For anonymous calls
  }[];
  lastMessage?: ChatMessage;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  context?: {
    serviceId?: string;
    sosRequestId?: string;
    serviceType?: string;
  };
  anonymousCallEnabled: boolean;
}

export interface CallState {
  isInCall: boolean;
  callType: 'audio' | 'video' | null;
  isAnonymous: boolean;
  participants: string[];
  startTime: Date | null;
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