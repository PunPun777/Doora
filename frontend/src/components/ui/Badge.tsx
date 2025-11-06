import React from 'react';
import { Check, GraduationCap, Users } from 'lucide-react';

interface BadgeProps {
  type: 'peer' | 'college' | 'neighborhood';
  verified: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({ type, verified, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const iconSize = {
    sm: 12,
    md: 16,
    lg: 24
  };

  const getBadgeConfig = () => {
    switch (type) {
      case 'peer':
        return {
          icon: <Check size={iconSize[size]} />,
          bgColor: verified ? 'bg-green-100' : 'bg-gray-100',
          textColor: verified ? 'text-green-600' : 'text-gray-400',
          borderColor: verified ? 'border-green-300' : 'border-gray-300',
          tooltip: verified ? 'Peer-Verified' : 'Not Peer-Verified'
        };
      case 'college':
        return {
          icon: <GraduationCap size={iconSize[size]} />,
          bgColor: verified ? 'bg-blue-100' : 'bg-gray-100',
          textColor: verified ? 'text-blue-600' : 'text-gray-400',
          borderColor: verified ? 'border-blue-300' : 'border-gray-300',
          tooltip: verified ? 'College-Verified' : 'Not College-Verified'
        };
      case 'neighborhood':
        return {
          icon: <Users size={iconSize[size]} />,
          bgColor: verified ? 'bg-purple-100' : 'bg-gray-100',
          textColor: verified ? 'text-purple-600' : 'text-gray-400',
          borderColor: verified ? 'border-purple-300' : 'border-gray-300',
          tooltip: verified ? 'Neighborhood-Verified' : 'Not Neighborhood-Verified'
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${config.bgColor} 
        ${config.borderColor}
        ${config.textColor}
        border-2 rounded-full flex items-center justify-center
        transition-all duration-200
        ${verified ? 'shadow-sm' : 'opacity-50'}
      `}
      title={config.tooltip}
    >
      {config.icon}
    </div>
  );
};