import { useAuth } from '../../contexts/AuthContext';
import { useRole } from '../../contexts/RoleContext';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentRole } = useRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Doora</span>
            </div>
            
            {user && currentRole && (
              <div className="hidden md:flex space-x-4">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => navigate('/chat')}
                  className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Messages
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Current Role Display Only */}
                {currentRole && (
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentRole === 'provider' 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-orange-100 text-orange-800 border border-orange-200'
                    }`}>
                      {currentRole === 'provider' ? '🚀 Provider' : '🔍 Seeker'}
                    </span>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Hello, {user.name}</span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-gray-500 hover:text-gray-700 text-sm border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button 
                onClick={() => navigate('/login')}
                className="px-3 py-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};