import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('doora_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
  // Simulate API call with password verification
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validate password (in real app, this would be API call)
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }
  
  const mockUser = {
    id: '1',
    email,
    name: email.split('@')[0],
    location: {
      latitude: 0,
      longitude: 0,
      address: 'Test Location'
    }
  };
  setUser(mockUser);
  localStorage.setItem('doora_user', JSON.stringify(mockUser));
  localStorage.setItem('doora_token', 'mock-token');
};
  const register = async (userData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = {
      id: '1',
      email: userData.email,
      name: userData.name,
      location: {
        latitude: 0,
        longitude: 0,
        address: 'User location'
      }
    };
    setUser(mockUser);
    localStorage.setItem('doora_user', JSON.stringify(mockUser));
    localStorage.setItem('doora_token', 'mock-token');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('doora_token');
    localStorage.removeItem('doora_user');
    localStorage.removeItem('doora_role');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};