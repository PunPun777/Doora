import React from 'react';
import { useSOSTimer } from '../../hooks/useSOSTimer';

interface SOSCountdownProps {
  expiresAt: string;
  showProgress?: boolean;
}

export const SOSCountdown: React.FC<SOSCountdownProps> = ({ 
  expiresAt, 
  showProgress = false 
}) => {
  const { timeRemaining, isExpired, progress } = useSOSTimer(expiresAt);

  return (
    <div className="flex items-center space-x-2">
      <div className={`px-2 py-1 rounded text-xs font-medium ${
        isExpired 
          ? 'bg-red-100 text-red-800' 
          : 'bg-orange-100 text-orange-800'
      }`}>
        {isExpired ? 'Expired' : `Expires in ${timeRemaining}`}
      </div>
      {showProgress && !isExpired && (
        <div className="w-16 bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-orange-500 h-1.5 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};