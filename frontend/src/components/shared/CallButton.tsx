import { useState } from 'react';

interface CallButtonProps {
  onInitiateCall: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const CallButton: React.FC<CallButtonProps> = ({ 
  onInitiateCall, 
  size = 'md' 
}) => {
  const [isCalling, setIsCalling] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const handleCall = async () => {
    setIsCalling(true);
    try {
      await onInitiateCall();
    } catch (error) {
      console.error('Call failed:', error);
    } finally {
      setIsCalling(false);
    }
  };

  return (
    <button
      onClick={handleCall}
      disabled={isCalling}
      className={`
        ${sizeClasses[size]}
        rounded-full flex items-center justify-center
        bg-green-500 hover:bg-green-600 disabled:bg-gray-400
        text-white transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
      `}
      title="Start call"
    >
      {isCalling ? (
        <span className="text-white font-bold">✕</span>
      ) : (
        <span className="text-white font-bold">📞</span>
      )}
    </button>
  );
};