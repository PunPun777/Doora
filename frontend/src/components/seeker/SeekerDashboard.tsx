import React, { useState } from 'react';
import { SearchFilters } from './SearchFilters';
import { ServiceGrid } from './ServiceGrid';
import { SOSForm } from './SOSForm';
import { MapInterface } from '../shared/MapInterface';
import { ChatInterface } from '../shared/ChatInterface';
import { SOSPost, SearchFilters as SearchFiltersType, Service, Conversation, ChatMessage } from '../../types';

const initialFilters: SearchFiltersType = {
  maxDistance: 50,
  minRating: 0,
  sortBy: 'distance',
};

// Mock data
const mockServices: Service[] = [
  {
    id: '1',
    title: 'Emergency Plumber',
    description: '24/7 plumbing services for emergencies',
    rating: 4.5,
    distance: 2.5,
    category: 'repair',
    hashtags: ['emergency', 'plumbing', 'repair'],
    rate: 75,
    provider: {
      id: 'provider1',
      name: 'John Plumbing',
      avatar: '👨‍🔧'
    },
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Medical Assistance',
    description: 'First aid and emergency medical help',
    rating: 4.8,
    distance: 1.2,
    category: 'medical',
    hashtags: ['medical', 'emergency', 'first-aid'],
    rate: 100,
    provider: {
      id: 'provider2',
      name: 'MediHelp Team',
      avatar: '👩‍⚕️'
    },
    createdAt: new Date('2024-01-16')
  }
];

export const SeekerDashboard: React.FC = () => {
  const [filters, setFilters] = useState<SearchFiltersType>(initialFilters);
  const [showSOSForm, setShowSOSForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<Service>();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [activeChat, setActiveChat] = useState<{
    conversation: Conversation;
    messages: ChatMessage[];
  } | null>(null);

  const handleSOSSubmit = (sosData: Partial<SOSPost>) => {
    console.log('SOS Data:', sosData);
    setShowSOSForm(false);
  };

  const handleStartChat = (service: Service) => {
    const conversation: Conversation = {
      id: `conv-${Date.now()}`,
      participantIds: ['seeker1', service.provider.id],
      participants: [
        {
          id: 'seeker1',
          name: 'You',
          role: 'seeker'
        },
        {
          id: service.provider.id,
          name: service.provider.name,
          role: 'provider'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      anonymousCallEnabled: true
    };

    const initialMessages: ChatMessage[] = [
      {
        id: '1',
        conversationId: conversation.id,
        senderId: service.provider.id,
        senderName: service.provider.name,
        senderRole: 'provider',
        content: `Hello! I'm available to help with ${service.title}. How can I assist you today?`,
        timestamp: new Date(),
        messageType: 'text',
        read: true
      }
    ];

    setActiveChat({
      conversation,
      messages: initialMessages
    });
  };

  const handleSendMessage = (content: string, messageType?: ChatMessage['messageType']) => {
    if (!activeChat) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      conversationId: activeChat.conversation.id,
      senderId: 'seeker1',
      senderName: 'You',
      senderRole: 'seeker',
      content,
      timestamp: new Date(),
      messageType: messageType || 'text',
      read: false
    };

    setActiveChat(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMessage]
    } : null);
  };

  const handleStartCall = (callType: 'audio' | 'video', anonymous: boolean) => {
    console.log('Starting call:', { callType, anonymous });
    alert(`Starting ${anonymous ? 'anonymous ' : ''}${callType} call with provider`);
  };

  // Filter services based on search
  const filteredServices = mockServices.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Get suggested services
  const suggestedServices = [...mockServices]
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Chat Interface Overlay */}
      {activeChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl h-3/4">
            <ChatInterface
              conversation={activeChat.conversation}
              messages={activeChat.messages}
              onSendMessage={handleSendMessage}
              onStartCall={handleStartCall}
              onClose={() => setActiveChat(null)}
            />
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* SOS Quick Action */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Emergency Assistance</h2>
              <p className="text-gray-600 mt-1">Need immediate help? Create an SOS request</p>
            </div>
            <button
              onClick={() => setShowSOSForm(true)}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
            >
              🚨 Create SOS
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search services, categories, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'map' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                🗺️ Map
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                📋 List
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Services */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Suggested Services Near You</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestedServices.map(service => (
              <div 
                key={service.id} 
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 cursor-pointer transition-colors"
                onClick={() => setSelectedService(service)}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{service.title}</h4>
                  <span>{service.provider.avatar}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>⭐ {service.rating}</span>
                  <span>📏 {service.distance}km</span>
                  <span>${service.rate}/hr</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <SearchFilters 
              filters={filters} 
              onFiltersChange={setFilters} 
            />
          </div>

          {/* Map/List View */}
          <div className="lg:col-span-3">
            {viewMode === 'map' ? (
              <MapInterface
                services={filteredServices}
                onServiceSelect={setSelectedService}
                selectedService={selectedService}
                onStartChat={handleStartChat}
              />
            ) : (
              <ServiceGrid 
                services={filteredServices}
                filters={filters}
                onFiltersChange={setFilters}
                onStartChat={handleStartChat}
              />
            )}
          </div>
        </div>

        {/* SOS Form Modal */}
        {showSOSForm && (
          <SOSForm 
            onSubmit={handleSOSSubmit}
            onCancel={() => setShowSOSForm(false)}
          />
        )}
      </div>
    </div>
  );
};