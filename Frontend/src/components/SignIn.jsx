import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back, Captain!');
      // The onAuthStateChanged listener in AuthContext will handle the UI change
    } catch (err) {
      toast.error('Failed to sign in. Check yer credentials, matey!');
      console.error("Sign in error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="auth-form-container">
      <h2>Welcome Back, Matey!</h2>
      <p>Sign in to access your saved code.</p>
      <form onSubmit={handleSignIn} className="auth-form">
        <div className="form-group">
          <label htmlFor="signin-email">Email Address</label>
          <input
            type="email"
            id="signin-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="captain@sea.com"
            required
            className="auth-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="signin-password">Password</label>
          <input
            type="password"
            id="signin-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your secret password"
            required
            className="auth-input"
          />
        </div>
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignIn;
