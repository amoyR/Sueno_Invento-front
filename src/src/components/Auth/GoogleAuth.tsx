import React from 'react';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { useAuth } from '../../contexts/AuthContext';
import '../../styles/Auth.css';

const GoogleAuth: React.FC<{ isSignUp?: boolean }> = ({ isSignUp = false }) => {
  const { googleAuth } = useAuth();

  const handleGoogleAuth = async () => {
    try {
      await googleAuth(isSignUp);
    } catch (error) {
      console.error('Google auth error:', error);
    }
  };

  return (
    <div className="google-auth-container">
      <GoogleLoginButton onClick={handleGoogleAuth}>
        {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
      </GoogleLoginButton>
    </div>
  );
};

export default GoogleAuth;
