import { useRole } from '../../contexts/RoleContext';

export const RoleSelector: React.FC = () => {
  const { setCurrentRole } = useRole();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">D</span>
            </div>
            <span className="text-4xl font-bold text-gray-900">Doora</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select which dashboard you'd like to view. You can switch between both anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Provider Card */}
          <button
            onClick={() => setCurrentRole('provider')}
            className="relative p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-400 group transform hover:scale-105"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-green-500 group-hover:to-blue-600 transition-colors">
                <span className="text-white text-3xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Provider Dashboard</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Manage your services, help the community, and grow your business.
              </p>
              <div className="space-y-2 text-sm text-left">
                <div className="flex items-center space-x-2 text-green-600">
                  <span>✓</span>
                  <span>Post and manage services</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <span>✓</span>
                  <span>Respond to SOS requests</span>
                </div>
                <div className="flex items-center space-x-2 text-green-600">
                  <span>✓</span>
                  <span>Track your earnings</span>
                </div>
              </div>
            </div>
          </button>

          {/* Seeker Card */}
          <button
            onClick={() => setCurrentRole('seeker')}
            className="relative p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-orange-400 group transform hover:scale-105"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-orange-500 group-hover:to-red-600 transition-colors">
                <span className="text-white text-3xl">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Seeker Dashboard</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Find trusted help, post urgent requests, and get things done.
              </p>
              <div className="space-y-2 text-sm text-left">
                <div className="flex items-center space-x-2 text-orange-600">
                  <span>✓</span>
                  <span>Search for service providers</span>
                </div>
                <div className="flex items-center space-x-2 text-orange-600">
                  <span>✓</span>
                  <span>Post urgent SOS requests</span>
                </div>
                <div className="flex items-center space-x-2 text-orange-600">
                  <span>✓</span>
                  <span>Chat with providers</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-lg">
            You can switch between dashboards anytime from the main dashboard page.
          </p>
        </div>
      </div>
    </div>
  );
};