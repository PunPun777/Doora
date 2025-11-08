import React, { useState } from 'react';
import { ChatInterface } from '../components/shared/ChatInterface';
// Remove unused CallButton import
// import { CallButton } from '../components/shared/CallButton';
import { ChatMessage, Conversation } from '../types';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      conversationId: 'conv1',
      senderId: 'user1',
      senderName: 'John Doe',
      senderRole: 'seeker',
      content: 'Hello, I need help with plumbing',
      timestamp: new Date('2024-01-15T10:30:00'),
      messageType: 'text',
      read: true
    },
    {
      id: '2',
      conversationId: 'conv1',
      senderId: 'user2', 
      senderName: 'Jane Smith',
      senderRole: 'provider',
      content: 'I can help! What seems to be the problem?',
      timestamp: new Date('2024-01-15T10:32:00'),
      messageType: 'text',
      read: true
    }
  ]);

  const mockConversation: Conversation = {
    id: 'conv1',
    participantIds: ['user1', 'user2'],
    participants: [
      {
        id: 'user1',
        name: 'John Doe',
        role: 'seeker'
      },
      {
        id: 'user2',
        name: 'Jane Smith',
        role: 'provider'
      }
    ],
    createdAt: new Date('2024-01-15T10:00:00'),
    updatedAt: new Date('2024-01-15T10:32:00'),
    isActive: true,
    anonymousCallEnabled: true
  };

  const handleSendMessage = (content: string, messageType?: ChatMessage['messageType']) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      conversationId: 'conv1',
      senderId: 'user2', // current user
      senderName: 'Jane Smith',
      senderRole: 'provider',
      content,
      timestamp: new Date(),
      messageType: messageType || 'text',
      read: false
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleStartCall = (callType: 'audio' | 'video', anonymous: boolean) => {
    console.log('Starting call:', { callType, anonymous });
    // Implement call logic here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto h-screen flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Chat</h1>
        </div>
        
        <div className="flex-1">
          <ChatInterface
            conversation={mockConversation}
            messages={messages}
            onSendMessage={handleSendMessage}
            onStartCall={handleStartCall}
            onClose={() => window.history.back()}
          />
        </div>
      </div>
    </div>
  );
};