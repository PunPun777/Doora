import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useRole } from '../../contexts/RoleContext';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { currentRole, setCurrentRole } = useRole();

  const handleLogout = () => {
    logout();
    setCurrentRole(null);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl"></span>
              <span className="text-xl font-bold text-gray-900">Doora</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {/* Messages Link */}
            <Link 
              to="/messages" 
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Messages
            </Link>

            {/* Dashboard Link */}
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Dashboard
            </Link>

            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">
                Hello, {user?.name}
              </span>
              
              {/* Current Role Indicator */}
              {currentRole && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  currentRole === 'provider' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {currentRole}
                </span>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};