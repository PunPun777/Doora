import { useState, useEffect } from 'react';

interface SOSTimer {
  timeRemaining: string;
  isExpired: boolean;
  progress: number;
}

export const useSOSTimer = (expiresAt: string): SOSTimer => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [isExpired, setIsExpired] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const expiration = new Date(expiresAt).getTime();
      const totalDuration = expiration - new Date(expiresAt).getTime() + (24 * 60 * 60 * 1000); // 24h window
      const remaining = expiration - now;

      if (remaining <= 0) {
        setIsExpired(true);
        setTimeRemaining('Expired');
        setProgress(0);
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeRemaining(`${hours}h ${minutes}m`);
      setProgress((remaining / totalDuration) * 100);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [expiresAt]);

  return { timeRemaining, isExpired, progress };
};