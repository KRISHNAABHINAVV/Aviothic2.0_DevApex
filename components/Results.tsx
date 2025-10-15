import React from 'react';
import { GameResult } from '../types';

interface ResultsProps {
  results: GameResult[];
  onReturnToDashboard: () => void;
}

const ShieldCheckIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);
const ExclamationTriangleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
);

const GameIcon: React.FC<{ name: string, className?: string }> = ({ name, className="w-6 h-6" }) => {
    switch(name) {
        case 'Memory Game': return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l-1.41-.513M5.106 17.785l1.15-.964m11.49 0l-1.149-.964M12 19.5v-3.75" /></svg>;
        case 'Pattern Game': return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>;
        case 'Reaction Test': return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>;
        case 'Facial Analysis': return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0 4.5 4.5 0 010-6.364l6.364-6.364a4.5 4.5 0 016.364 6.364l-6.364 6.364z" /><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z" /></svg>;
        default: return null;
    }
}

const Results: React.FC<ResultsProps> = ({ results, onReturnToDashboard }) => {

  const calculateOverallRisk = () => {
    let totalScore = 0;
    
    const memory = results.find(r => r.game === 'Memory Game')?.score ?? 10;
    const pattern = results.find(r => r.game === 'Pattern Game')?.score ?? 0;
    const reaction = results.find(r => r.game === 'Reaction Test')?.score ?? 500;
    const facial = results.find(r => r.game === 'Facial Analysis')?.score ?? 5;

    // Normalize and weigh scores (this is a mock algorithm)
    totalScore += memory * 2.5; // Higher mistakes = higher score
    totalScore -= pattern * 4; // Higher level = lower score
    totalScore += (reaction - 280) / 15; // Slower reaction = higher score
    totalScore += facial * 2; // More "inconsistencies" = higher score

    if (totalScore < 20) {
      return { level: 'Low Risk', color: 'green', message: 'Your performance indicates a low probability of cognitive decline. Maintain a healthy lifestyle.' };
    } else if (totalScore < 40) {
      return { level: 'Some Indicators', color: 'yellow', message: 'Some results show potential signs of cognitive decline. It may be beneficial to monitor your cognitive health and speak with a doctor.' };
    } else {
      return { level: 'Significant Indicators', color: 'red', message: 'Your results show several indicators that may suggest cognitive decline. We strongly recommend consulting a healthcare professional for a proper evaluation.' };
    }
  };

  const risk = calculateOverallRisk();
  const indicatorColors = {
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      red: 'bg-red-100 text-red-800',
  }

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-slate-800 mb-6">Assessment Results</h2>
        
        <div className={`p-8 my-8 rounded-2xl ${indicatorColors[risk.color]}`}>
            <div className="flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${indicatorColors[risk.color].replace('100', '200')}`}>
                    {risk.color === 'green' ? <ShieldCheckIcon className="w-12 h-12" /> : <ExclamationTriangleIcon className="w-12 h-12" />}
                </div>
                <h3 className={`text-3xl font-bold mt-4`}>{risk.level} Detected</h3>
                <p className="mt-2 max-w-xl mx-auto text-lg">{risk.message}</p>
            </div>
        </div>

        <h4 className="text-2xl font-bold mt-10 mb-5">Detailed Breakdown</h4>
        <div className="space-y-4 text-left">
            {results.map((result, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-lg flex items-center justify-between border border-slate-200">
                    <div className="flex items-center">
                        <div className="bg-white p-2 rounded-full mr-4">
                            <GameIcon name={result.game} className="w-7 h-7 text-sky-600" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-700 text-lg">{result.game}</p>
                            <p className="text-sm text-slate-500">{result.metric}</p>
                        </div>
                    </div>
                    <p className="text-sky-600 text-2xl font-semibold">{result.score}</p>
                </div>
            ))}
        </div>

        <div className="mt-10 p-4 bg-red-50 border-l-4 border-red-500 text-red-800 text-left rounded-r-lg">
            <p className="font-bold">Important Disclaimer</p>
            <p>This is not a medical diagnosis. NeuroCare is an informational tool and cannot replace a professional medical evaluation. Please consult with a qualified healthcare provider for any health concerns.</p>
        </div>
        
        <button
          onClick={onReturnToDashboard}
          className="mt-10 px-8 py-4 bg-sky-500 text-white font-bold rounded-full text-lg hover:bg-sky-600 transition-colors transform hover:scale-105"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Results;