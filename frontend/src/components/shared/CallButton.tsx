import React, { useState } from 'react';
import { Conversation } from '../../types';

interface CallButtonProps {
  conversation: Conversation;
  onStartCall: (callType: 'audio' | 'video', anonymous: boolean) => void;
}

export const CallButton: React.FC<CallButtonProps> = ({ 
  // Remove unused conversation parameter
  // conversation, 
  onStartCall 
}) => {
  const [showCallOptions, setShowCallOptions] = useState(false);

  const handleCall = (callType: 'audio' | 'video', anonymous: boolean = false) => {
    onStartCall(callType, anonymous);
    setShowCallOptions(false);
  };

  return (
    <div className="relative">
      {/* Main Call Button */}
      <button
        onClick={() => setShowCallOptions(!showCallOptions)}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        📞 Call
      </button>

      {/* Call Options Dropdown */}
      {showCallOptions && (
        <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 min-w-48 z-50">
          {/* Regular Calls */}
          <div className="mb-2">
            <p className="text-xs text-gray-500 px-2 py-1">Direct Call</p>
            <button
              onClick={() => handleCall('audio', false)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
            >
              🎵 Audio Call
            </button>
            <button
              onClick={() => handleCall('video', false)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
            >
              📹 Video Call
            </button>
          </div>

          {/* Anonymous Calls */}
          <div className="border-t pt-2">
            <p className="text-xs text-gray-500 px-2 py-1">Anonymous</p>
            <button
              onClick={() => handleCall('audio', true)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2 text-orange-600"
            >
              🎭 Anonymous Audio
            </button>
            <button
              onClick={() => handleCall('video', true)}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md flex items-center gap-2 text-orange-600"
            >
              🎭 Anonymous Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};