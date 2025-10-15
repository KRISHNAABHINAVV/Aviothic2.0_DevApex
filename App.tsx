import React, { useState, useCallback, useEffect } from 'react';
import { Page, GameResult } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AssessmentFlow from './components/AssessmentFlow';
import Results from './components/Results';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [results, setResults] = useState<GameResult[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  useEffect(() => {
    const loggedInUserEmail = localStorage.getItem('neuroCareUser');
    if (loggedInUserEmail) {
      setCurrentUser(loggedInUserEmail);
    }
  }, []);

  const handleLogin = useCallback((email: string) => {
    localStorage.setItem('neuroCareUser', email);
    setCurrentUser(email);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('neuroCareUser');
    setCurrentUser(null);
    setCurrentPage('dashboard');
  }, []);

  const handleStartAssessment = useCallback(() => {
    setResults([]);
    setCurrentPage('assessment');
  }, []);

  const handleAssessmentComplete = useCallback((finalResults: GameResult[]) => {
    setResults(finalResults);
    setCurrentPage('results');
  }, []);
  
  const handleReturnToDashboard = useCallback(() => {
    setCurrentPage('dashboard');
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'assessment':
        return <AssessmentFlow onComplete={handleAssessmentComplete} />;
      case 'results':
        return <Results results={results} onReturnToDashboard={handleReturnToDashboard} />;
      case 'dashboard':
      default:
        return <Dashboard onStart={handleStartAssessment} isLoggedIn={!!currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800">
      <Header currentUser={currentUser} onLogin={handleLogin} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-12">
        {renderPage()}
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm border-t border-slate-200">
        <p>NeuroCare is for informational purposes only. Consult a medical professional for diagnosis.</p>
      </footer>
    </div>
  );
};

export default App;