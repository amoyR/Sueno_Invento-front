import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import '../../styles/Auth.css';

const SignIn: React.FC = () => {
  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <GoogleAuth isSignUp={false} />
      <p className="auth-link">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
