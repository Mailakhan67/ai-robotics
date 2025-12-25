import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authApi } from '../services/authApi';

interface User {
  id: number;
  email: string;
  full_name: string;
  created_at: string;
  software_background?: string;
  hardware_background?: string;
  purpose_of_learning?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  signup: (userData: User) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
      // Even if the API call fails, still clear local state
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      // Clear any stored tokens if needed
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
    }
  };

  const signup = (userData: User) => {
    // For signup, we'll just set the user as logged in
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    loading,
    setLoading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};