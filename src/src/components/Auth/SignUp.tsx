import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import '../../styles/Auth.css';

const SignUp: React.FC = () => {
  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <GoogleAuth isSignUp={true} />
      <p className="auth-link">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </div>
  );
};

export default SignUp;
