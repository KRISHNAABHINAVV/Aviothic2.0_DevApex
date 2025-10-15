import React, { useState, useEffect } from 'react';
import { User } from '../types';

// Helper functions to interact with localStorage
const getUsers = (): User[] => {
  try {
    const usersJson = localStorage.getItem('neuroCareUsers');
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error("Failed to parse users from localStorage", error);
    return [];
  }
};

const saveUsers = (users: User[]) => {
  localStorage.setItem('neuroCareUsers', JSON.stringify(users));
};

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setError('');
      setIsLoginView(true);
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setError('');
      onLoginSuccess(email);
      onClose();
    } else {
      setError('Invalid email or password.');
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
        setError('Email and password cannot be empty.');
        return;
    }
    const users = getUsers();
    if (users.some(u => u.email === email)) {
      setError('An account with this email already exists.');
    } else {
      // In a real app, hash the password before saving.
      const newUser: User = { email, password };
      saveUsers([...users, newUser]);
      setError('');
      onLoginSuccess(email); // Automatically log in after signup
      onClose();
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-bold mb-4 text-center text-slate-700">{isLoginView ? 'Login to NeuroCare' : 'Create an Account'}</h2>
        
        <form onSubmit={isLoginView ? handleLogin : handleSignUp}>
          {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-center">{error}</p>}
          <div className="mb-4">
            <label className="block text-slate-600 mb-2" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" 
              placeholder="user@example.com" 
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-600 mb-2" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500" 
              placeholder="••••••••" 
              required 
            />
          </div>
          <button type="submit" className="w-full bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600 transition-colors font-semibold text-lg">
            {isLoginView ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-slate-600 mt-6">
          {isLoginView ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => { setIsLoginView(!isLoginView); setError(''); }} className="font-semibold text-sky-600 hover:underline">
            {isLoginView ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
