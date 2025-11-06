interface SOSPost {
  id: string;
  title: string;
  description: string;
  expiresAt: string;
  seeker: {
    name: string;
    location: {
      address?: string;
    };
  };
}

interface SOSListProps {
  sosPosts: SOSPost[];
  onClaim?: (sosId: string) => void;
  showActions?: boolean;
}

export const SOSList: React.FC<SOSListProps> = ({ 
  sosPosts, 
  onClaim, 
  showActions = false 
}) => {
  if (sosPosts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-gray-400">⚠️</span>
        </div>
        <p>No active SOS posts</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sosPosts.map((sos) => (
        <div
          key={sos.id}
          className="bg-white border border-orange-200 rounded-lg p-4 shadow-sm"
        >
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-gray-900 text-lg">{sos.title}</h3>
            <div className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs font-medium">
              Urgent
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{sos.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <span>👤</span>
                <span>{sos.seeker.name}</span>
              </div>
              {sos.seeker.location.address && (
                <div className="flex items-center space-x-1">
                  <span>📍</span>
                  <span>{sos.seeker.location.address}</span>
                </div>
              )}
            </div>
            
            {showActions && onClaim && (
              <button
                onClick={() => onClaim(sos.id)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
              >
                Help Now
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};