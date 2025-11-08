import React, { useState } from 'react';
import { ChatInterface } from '../components/shared/ChatInterface';
import { ChatMessage, Conversation } from '../types'; // Remove Service import
import { useAuth } from '../contexts/AuthContext';

export const MessagesPage: React.FC = () => {
  const { user } = useAuth();
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Mock conversations list
  const conversations: Conversation[] = [
    {
      id: 'conv1',
      participantIds: ['seeker1', 'provider1'],
      participants: [
        {
          id: 'seeker1',
          name: 'John Doe',
          role: 'seeker'
        },
        {
          id: 'provider1',
          name: 'Jane Plumbing',
          role: 'provider'
        }
      ],
      lastMessage: {
        id: '1',
        conversationId: 'conv1',
        senderId: 'seeker1',
        senderName: 'John Doe',
        senderRole: 'seeker',
        content: 'Hello, I need help with plumbing',
        timestamp: new Date('2024-01-15T10:30:00'),
        messageType: 'text',
        read: true
      },
      createdAt: new Date('2024-01-15T10:00:00'),
      updatedAt: new Date('2024-01-15T10:30:00'),
      isActive: true,
      anonymousCallEnabled: true
    }
  ];

  const handleSendMessage = (content: string, messageType?: ChatMessage['messageType']) => {
    if (!activeConversation) return;

    // Get user role - use a default if not available
    const userRole = 'seeker'; // Default role, adjust as needed

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      conversationId: activeConversation.id,
      senderId: user?.id || 'user1',
      senderName: user?.name || 'You',
      senderRole: userRole as 'provider' | 'seeker',
      content,
      timestamp: new Date(),
      messageType: messageType || 'text',
      read: false
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleStartCall = (callType: 'audio' | 'video', anonymous: boolean) => {
    console.log('Starting call:', { callType, anonymous });
    // Implement actual call logic here
    alert(`Starting ${anonymous ? 'anonymous ' : ''}${callType} call`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600">Connect with service providers and seekers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conversations Sidebar */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Conversations</h2>
            <div className="space-y-2">
              {conversations.map(conversation => (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    activeConversation?.id === conversation.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setActiveConversation(conversation);
                    setMessages([conversation.lastMessage!]);
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {conversation.participants.find(p => p.id !== user?.id)?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {conversation.participants.find(p => p.id !== user?.id)?.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {conversation.lastMessage?.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            {activeConversation ? (
              <ChatInterface
                conversation={activeConversation}
                messages={messages}
                onSendMessage={handleSendMessage}
                onStartCall={handleStartCall}
                onClose={() => setActiveConversation(null)}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">💬</div>
                  <p className="text-lg">Select a conversation to start chatting</p>
                  <p className="text-sm">Or find services to connect with providers</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};