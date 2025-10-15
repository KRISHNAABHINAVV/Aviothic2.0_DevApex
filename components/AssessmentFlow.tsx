import React, { useState, useCallback, useMemo } from 'react';
import { GameResult } from '../types';
import MemoryGame from './games/MemoryGame';
import PatternGame from './games/PatternGame';
import ReactionTest from './games/ReactionTest';
import FacialAnalysis from './FacialAnalysis';

interface AssessmentFlowProps {
  onComplete: (results: GameResult[]) => void;
}

type AssessmentStep = 'memory' | 'pattern' | 'reaction' | 'facial' | 'finished';

const steps: { id: AssessmentStep, name: string }[] = [
    { id: 'memory', name: 'Memory Game' },
    { id: 'pattern', name: 'Pattern Game' },
    { id: 'reaction', name: 'Reaction Test' },
    { id: 'facial', name: 'Facial Analysis' },
];

const AssessmentFlow: React.FC<AssessmentFlowProps> = ({ onComplete }) => {
  const [currentStepId, setCurrentStepId] = useState<AssessmentStep>('memory');
  const [results, setResults] = useState<GameResult[]>([]);
  
  const currentStepIndex = useMemo(() => steps.findIndex(s => s.id === currentStepId), [currentStepId]);

  const nextStep = useCallback((result: GameResult) => {
    const updatedResults = [...results, result];
    setResults(updatedResults);

    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < steps.length) {
        setCurrentStepId(steps[nextStepIndex].id);
    } else {
        setCurrentStepId('finished');
        onComplete(updatedResults);
    }
  }, [currentStepIndex, results, onComplete]);

  const renderStep = () => {
    switch (currentStepId) {
      case 'memory':
        return <MemoryGame onComplete={nextStep} />;
      case 'pattern':
        return <PatternGame onComplete={nextStep} />;
      case 'reaction':
        return <ReactionTest onComplete={nextStep} />;
      case 'facial':
        return <FacialAnalysis onComplete={nextStep} />;
      case 'finished':
          return <p className="text-center text-lg">Assessment complete. Calculating results...</p>
      default:
        return null;
    }
  };

  const progressPercentage = currentStepId === 'finished' ? 100 : ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-2xl shadow-xl">
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-center text-slate-700 mb-2">Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex]?.name}</h2>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
                <div className="bg-sky-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>
        </div>
      <div className="transition-opacity duration-300">
        {renderStep()}
      </div>
    </div>
  );
};

export default AssessmentFlow;