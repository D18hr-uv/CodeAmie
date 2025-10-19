import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(email, password);
      toast.success('Welcome aboard, matey! Your account is ready.');
      // The onAuthStateChanged listener in AuthContext will handle the UI change
    } catch (err) {
      let errorMessage = 'Failed to create account.';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use by another pirate.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Your password must be at least 6 characters long.';
      }
      toast.error(errorMessage);
      console.error("Sign up error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="auth-form-container">
      <h2>Create Your Account</h2>
      <p>Join the crew and save your code reviews!</p>
      <form onSubmit={handleSignUp} className="auth-form">
        <div className="form-group">
          <label htmlFor="signup-email">Email Address</label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="captain@sea.com"
            required
            className="auth-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="signup-password">Password</label>
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
            minLength="6"
            className="auth-input"
          />
        </div>
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
