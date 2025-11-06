import { useRole } from '../contexts/RoleContext';
import { RoleSelector } from '../components/shared/RoleSelector';
import { ProviderDashboard } from '../components/provider/ProviderDashboard';
import { SeekerDashboard } from '../components/seeker/SeekerDashboard';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { currentRole, setCurrentRole } = useRole();
  const { user } = useAuth();

  // Always show role selector if no role is selected
  if (!currentRole) {
    return <RoleSelector />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Role Selection Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your Doora experience
              </p>
            </div>
            
            {/* Dashboard Switcher */}
            <button
              onClick={() => setCurrentRole(null)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Switch
            </button>
          </div>

          {/* Role Navigation Buttons */}
          {/* <div className="flex space-x-4 pb-6">
            <button
              onClick={() => setCurrentRole('provider')}
              className={`px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                currentRole === 'provider'
                  ? 'bg-blue-600 text-white shadow-md border-2 border-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-blue-400'
              }`}
            >
              🚀 Provider 
            </button>
            <button
              onClick={() => setCurrentRole('seeker')}
              className={`px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                currentRole === 'seeker'
                  ? 'bg-blue-600 text-white shadow-md border-2 border-blue-600'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-blue-400'
              }`}
            >
              🔍 Seeker 
            </button>
          </div> */}
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {currentRole === 'provider' && <ProviderDashboard />}
        {currentRole === 'seeker' && <SeekerDashboard />}
      </div>
    </div>
  );
};