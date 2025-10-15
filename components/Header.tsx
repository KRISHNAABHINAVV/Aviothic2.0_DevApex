import React, { useState } from 'react';
import LoginModal from './LoginModal';

const BrainIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C9.25 2 7 4.25 7 7C7 8.66 7.84 10.1 9 11V12.5C9 13.88 7.88 15 6.5 15C5.12 15 4 13.88 4 12.5V11.15C2.81 10.5 2 9.35 2 8C2 5.79 3.79 4 6 4C7.66 4 9.05 5.05 9.61 6.5H14.39C14.95 5.05 16.34 4 18 4C20.21 4 22 5.79 22 8C22 9.35 21.19 10.5 20 11.15V12.5C20 13.88 18.88 15 17.5 15C16.12 15 15 13.88 15 12.5V11C16.16 10.1 17 8.66 17 7C17 4.25 14.75 2 12 2ZM6 6C4.9 6 4 6.9 4 8C4 9.1 4.9 10 6 10S8 9.1 8 8C8 6.9 7.1 6 6 6ZM18 6C16.9 6 16 6.9 16 8C16 9.1 16.9 10 18 10S20 9.1 20 8C20 6.9 19.1 6 18 6Z" />
    <path d="M12 16C12.55 16 13 16.45 13 17V17.5C13 18.88 14.12 20 15.5 20C16.88 20 18 18.88 18 17.5V16H20V17.5C20 20.24 17.74 22 15 22H9C6.26 22 4 20.24 4 17.5V16H6V17.5C6 18.88 7.12 20 8.5 20C9.88 20 11 18.88 11 17.5V17C11 16.45 11.45 16 12 16Z" />
  </svg>
);

interface HeaderProps {
  currentUser: string | null;
  onLogin: (email: string) => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogin, onLogout }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <header className="bg-white sticky top-0 z-10 shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <BrainIcon className="w-9 h-9 text-sky-500" />
            <h1 className="text-3xl font-bold text-slate-800">NeuroCare</h1>
          </div>
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <>
                <span className="text-slate-600 hidden sm:block">Welcome, <span className="font-semibold">{currentUser}</span></span>
                <button
                  onClick={onLogout}
                  className="px-5 py-2.5 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="px-5 py-2.5 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </div>
      </header>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={onLogin} />
    </>
  );
};

export default Header;
