import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ChatInterface } from '../components/shared/ChatInterface';
import { CallButton } from '../components/shared/CallButton';

export const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { 
      id: '1', 
      text: 'Hello! Welcome to Doora chat.', 
      sender: { id: 'system', name: 'System' }, 
      timestamp: new Date().toISOString() 
    },
    { 
      id: '2', 
      text: 'This is where you can message service providers or seekers.', 
      sender: { id: 'system', name: 'System' }, 
      timestamp: new Date().toISOString() 
    },
  ]);

  const handleSendMessage = (content: string) => {
    if (!user) return;
    
    const newMsg = {
      id: (messages.length + 1).toString(),
      text: content,
      sender: { id: user.id, name: user.name },
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, newMsg]);
  };

  const handleInitiateCall = () => {
    alert('Initiating call with support...');
    // In real app, this would start a WebRTC call
  };

  if (!user) {
    return <div>Please log in</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ← Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <div className="flex-1"></div>
          <CallButton onInitiateCall={handleInitiateCall} />
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[600px]">
          <ChatInterface
            messages={messages}
            currentUser={user}
            onSendMessage={handleSendMessage}
            onInitiateCall={handleInitiateCall}
          />
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>All chat components are working! Try sending a message or clicking the call button.</p>
        </div>
      </div>
    </div>
  );
};