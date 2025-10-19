import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import MainApp from './components/MainApp';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App(){
  const { currentUser, logout } = useAuth();
  const [isSigningUp, setIsSigningUp] = useState(false);

  // This is the view for logged-out users
  const AuthView = () => (
    <div className="auth-page">
        <header className="app-header" style={{ justifyContent: 'center' }}>
            <div>
                <h1>CodeAmie</h1>
                <p>Your AI Code Review Assistant</p>
            </div>
        </header>
        <div className="auth-wrapper">
            {isSigningUp ? <SignUp /> : <SignIn />}
            <button onClick={() => setIsSigningUp(!isSigningUp)} className="toggle-auth-button">
                {isSigningUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
        </div>
        <footer className="app-footer">
            <p>&copy; {new Date().getFullYear()} CodeAmie. Crafted with AI.</p>
        </footer>
    </div>
  );

  const LoggedInView = () => (
    <div className="app-container">
      <header className="app-header">
        <h1>CodeAmie</h1>
        {currentUser && (
          <div className="user-info">
            <span className="user-email" title={currentUser.email}>{currentUser.email}</span>
            <button onClick={logout} className="logout-button">Sign Out</button>
          </div>
        )}
      </header>
      <MainApp />
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} CodeAmie. Crafted with AI.</p>
      </footer>
    </div>
  );

  
  return (
    <>
        <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                    border: '1px solid #555',
                },
            }}
        />
        {currentUser ? <LoggedInView /> : <AuthView />}
    </>
  );
}

export default App;
