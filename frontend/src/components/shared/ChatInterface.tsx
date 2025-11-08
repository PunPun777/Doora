import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Conversation } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { CallButton } from './CallButton';

interface ChatInterfaceProps {
  conversation: Conversation;
  onSendMessage: (content: string, messageType?: ChatMessage['messageType']) => void;
  onStartCall: (callType: 'audio' | 'video', anonymous: boolean) => void;
  onClose: () => void;
  messages: ChatMessage[];
  isInCall?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversation,
  onSendMessage,
  onStartCall,
  onClose,
  messages,
  isInCall = false
}) => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "I'm on my way",
    "ETA 10 minutes",
    "Can you share your location?",
    "I'll be there shortly",
    "Emergency? Call me immediately",
    "Payment details",
    "Service completed"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim(), 'text');
      setNewMessage('');
    }
  };

  const handleQuickReply = (message: string) => {
    onSendMessage(message, 'text');
    setShowQuickReplies(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getOtherParticipant = () => {
    return conversation.participants.find(p => p.id !== user?.id);
  };

  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const renderMessage = (message: ChatMessage) => {
    const isOwnMessage = message.senderId === user?.id;
    
    return (
      <div
        key={message.id}
        className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            isOwnMessage
              ? 'bg-blue-600 text-white rounded-br-none'
              : 'bg-gray-200 text-gray-900 rounded-bl-none'
          }`}
        >
          {/* Message header with name and time */}
          <div className={`text-xs mb-1 ${isOwnMessage ? 'text-blue-100' : 'text-gray-500'}`}>
            {!isOwnMessage && (
              <span className="font-medium">{message.senderName} • </span>
            )}
            {formatTime(message.timestamp)}
          </div>
          
          {/* Message content */}
          <div className="break-words">
            {message.content}
          </div>

          {/* Call request indicator */}
          {message.messageType === 'call_request' && (
            <div className="flex items-center gap-1 mt-1 text-xs">
              <span>📞</span>
              <span>
                {message.metadata?.anonymous ? 'Anonymous ' : ''}
                {message.metadata?.callType === 'video' ? 'Video' : 'Audio'} Call
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            {getOtherParticipant()?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {getOtherParticipant()?.name}
            </h3>
            <p className="text-sm text-gray-500 capitalize">
              {getOtherParticipant()?.role}
              <span className="ml-2 text-green-500">● Online</span>
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Call Button */}
          <CallButton conversation={conversation} onStartCall={onStartCall} />

          {/* Quick Replies Button */}
          <button
            onClick={() => setShowQuickReplies(!showQuickReplies)}
            className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            title="Quick Replies"
          >
            💬
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Quick Replies Panel */}
      {showQuickReplies && (
        <div className="bg-gray-50 border-b border-gray-200 p-3">
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-100 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active Call Banner */}
      {isInCall && (
        <div className="bg-green-100 border-b border-green-200 p-3 text-center">
          <div className="flex items-center justify-center gap-2 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium">Active Call - Anonymous</span>
          </div>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className="text-4xl mb-2">💬</div>
            <p className="text-lg">Start a conversation</p>
            <p className="text-sm">Send a message or make a call to get started</p>
          </div>
        ) : (
          messages.map(renderMessage)
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-2">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors self-end"
          >
            Send
          </button>
        </div>
        
        {/* Anonymous Chat Notice */}
        <div className="mt-2 text-xs text-gray-500 text-center">
          💡 Tip: Use anonymous calls to protect your privacy
        </div>
      </div>
    </div>
  );
};