import { useState } from 'react';
import { Plus, AlertTriangle } from 'lucide-react';
import { PostServiceForm } from './PostServiceForm';
import { ProviderMetrics } from './ProviderMetrics';
import { SOSList } from '../shared/SOSList';

export const ProviderDashboard: React.FC = () => {
  const [showServiceForm, setShowServiceForm] = useState(false);

  // Mock metrics data
  const mockMetrics = {
    skillsShared: 12,
    jobsDone: 8,
    positiveRatings: 15,
    communityScore: 92,
    badges: {
      peerVerified: true,
      collegeVerified: false,
      neighborhoodVerified: true,
    },
  };

  // Mock SOS data
  const mockSOSPosts = [
    {
      id: '1',
      title: 'Urgent Plumbing Help Needed',
      description: 'Pipe burst in kitchen, need immediate assistance. Water is leaking everywhere!',
      duration: 3,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      seeker: {
        id: '2',
        name: 'John Doe',
        email: 'john@example.com',
        location: {
          latitude: 0,
          longitude: 0,
          address: '2km away - Maple Street'
        }
      },
      status: 'active' as const
    },
    {
      id: '2',
      title: 'Math Tutoring Required ASAP',
      description: 'Final exam tomorrow, need help with calculus concepts urgently.',
      duration: 4,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
      seeker: {
        id: '3',
        name: 'Sarah Smith',
        email: 'sarah@example.com',
        location: {
          latitude: 0,
          longitude: 0,
          address: '1.5km away - Oak Avenue'
        }
      },
      status: 'active' as const
    }
  ];

  const handleClaimSOS = (sosId: string) => {
    alert(`You have claimed SOS post: ${sosId}\nThe seeker will be notified immediately!`);
    // In real app, this would call an API
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Provider Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your services and help your community
          </p>
        </div>
        <button
          onClick={() => setShowServiceForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Post Service</span>
        </button>
      </div>

      {/* Metrics */}
      <ProviderMetrics metrics={mockMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* My Services */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            My Services
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900">Math Tutoring</h3>
              <p className="text-blue-700 text-sm mt-1">$25/hour • 12 active requests</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-900">Home Repair</h3>
              <p className="text-green-700 text-sm mt-1">$40/hour • 5 active requests</p>
            </div>
            <button
              onClick={() => setShowServiceForm(true)}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-300 hover:text-blue-500 transition-colors text-center"
            >
              <Plus className="w-6 h-6 mx-auto mb-2" />
              <span>Add another service</span>
            </button>
          </div>
        </div>

        {/* Urgent SOS Posts */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-semibold text-gray-900">
              Urgent SOS Posts
            </h2>
          </div>
          <SOSList
            sosPosts={mockSOSPosts}
            onClaim={handleClaimSOS}
            showActions={true}
          />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-2xl font-bold text-blue-600">8</div>
          <div className="text-sm text-gray-600">Active Jobs</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-2xl font-bold text-green-600">$320</div>
          <div className="text-sm text-gray-600">Earned Today</div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="text-2xl font-bold text-purple-600">4.9★</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
      </div>

      {/* Service Form Modal */}
      {showServiceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <PostServiceForm onClose={() => setShowServiceForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};