import { useRole } from '../contexts/RoleContext';
import { RoleSelector } from '../components/shared/RoleSelector';
import { ProviderDashboard } from '../components/provider/ProviderDashboard';
import { SeekerDashboard } from '../components/seeker/SeekerDashboard';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { currentRole, setCurrentRole } = useRole();
  const { user } = useAuth();

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
                Welcome, {user?.name}!
                <span className="text-lg">👋</span>
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your Doora experience
              </p>
            </div>
            
            {/* Current Role Display and Dashboard Button */}
            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center space-x-2">
                {/* <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentRole === 'provider' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-orange-100 text-orange-800 border border-orange-200'
                }`}>
                  {currentRole === 'provider' ? 'Provider' : 'Seeker'}
                </span> */}
              </div>
              <button
                onClick={() => setCurrentRole(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm font-medium"
              >
                Dashboard
              </button>
            </div>
          </div>

          {/* REMOVED: Role Navigation Buttons section - completely deleted */}
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