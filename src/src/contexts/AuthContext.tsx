import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  googleAuth: (isSignUp: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService.getCurrentUser().then(setUser).catch(console.error);
    }
  }, []);

  const googleAuth = async (isSignUp: boolean) => {
    try {
      if (isSignUp) {
        await authService.googleSignUp();
      } else {
        await authService.googleSignIn();
      }
    } catch (error) {
      console.error('Google auth error:', error);
    }
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    navigate('/signin');
  };

  return (
    <AuthContext.Provider value={{ user, googleAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
