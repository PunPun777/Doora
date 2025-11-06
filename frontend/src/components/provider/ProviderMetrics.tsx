import { Star, TrendingUp, Users, Award } from 'lucide-react';

interface ProviderMetricsProps {
  metrics: {
    skillsShared: number;
    jobsDone: number;
    positiveRatings: number;
    communityScore: number;
    badges: {
      peerVerified: boolean;
      collegeVerified: boolean;
      neighborhoodVerified: boolean;
    };
  };
}

export const ProviderMetrics: React.FC<ProviderMetricsProps> = ({ metrics }) => {
  const stats = [
    {
      label: 'Skills Shared',
      value: metrics.skillsShared,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Jobs Done',
      value: metrics.jobsDone,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Positive Ratings',
      value: metrics.positiveRatings,
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      label: 'Community Score',
      value: metrics.communityScore,
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Your Impact Metrics
      </h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div
              className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}
            >
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Community Badges
        </h3>
        <div className="flex space-x-6 justify-center">
          <div className="text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
              metrics.badges.peerVerified ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              ✓
            </div>
            <div className="mt-2 text-sm font-medium text-gray-900">Peer</div>
            <div className="text-xs text-gray-500">Verified</div>
          </div>
          <div className="text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
              metrics.badges.collegeVerified ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
            }`}>
              🎓
            </div>
            <div className="mt-2 text-sm font-medium text-gray-900">College</div>
            <div className="text-xs text-gray-500">Verified</div>
          </div>
          <div className="text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${
              metrics.badges.neighborhoodVerified ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-400'
            }`}>
              🏘️
            </div>
            <div className="mt-2 text-sm font-medium text-gray-900">Local</div>
            <div className="text-xs text-gray-500">Verified</div>
          </div>
        </div>
      </div>
    </div>
  );
};