import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserRole = 'provider' | 'seeker' | null;

interface RoleContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(null);

  useEffect(() => {
    const savedRole = localStorage.getItem('doora_role') as UserRole;
    if (savedRole) {
      setCurrentRole(savedRole);
    }
  }, []);

  const updateRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role) {
      localStorage.setItem('doora_role', role);
    } else {
      localStorage.removeItem('doora_role');
    }
  };

  const value = {
    currentRole,
    setCurrentRole: updateRole,
  };

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};