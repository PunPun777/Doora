import React from 'react';
import { SOSPost } from '../../types';

interface SOSListProps {
  sosRequests: SOSPost[];
  onRespondToSOS: (sos: SOSPost) => void;
}

export const SOSList: React.FC<SOSListProps> = ({ sosRequests, onRespondToSOS }) => {
  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTimeRemaining = (expiryTimestamp: Date) => {
    const now = new Date();
    const expiry = new Date(expiryTimestamp);
    const diffMs = expiry.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHrs > 0) {
      return `${diffHrs}h ${diffMins}m`;
    }
    return `${diffMins}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Urgent SOS Posts</h2>
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Active SOS Requests</h3>
      
      <div className="space-y-6">
        {sosRequests.map(sos => (
          <div key={sos.id} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
            {/* SOS Header */}
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-lg font-semibold text-gray-900">{sos.title}</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(sos.urgency)}`}>
                {sos.urgency}
              </span>
            </div>

            {/* SOS Description */}
            <p className="text-gray-700 mb-4">{sos.description}</p>

            {/* Location and Time */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  {sos.location.address || 'Nearby'}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  {formatTimeRemaining(sos.expiryTimestamp)} remaining
                </span>
              </div>
            </div>

            {/* Footer with User and Respond Button */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200">
              <span className="text-sm text-gray-600">By: {sos.userName}</span>
              <button
                onClick={() => onRespondToSOS(sos)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
              >
                Respond
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};