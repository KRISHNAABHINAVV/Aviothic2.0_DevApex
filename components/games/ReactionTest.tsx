import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameResult } from '../../types';

interface ReactionTestProps {
  onComplete: (result: GameResult) => void;
}

const ReactionTest: React.FC<ReactionTestProps> = ({ onComplete }) => {
  const [status, setStatus] = useState<'waiting' | 'ready' | 'clicked'>('waiting');
  const [times, setTimes] = useState<number[]>([]);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const ATTEMPTS = 5;

  const startTest = useCallback(() => {
    const delay = Math.random() * 2500 + 1500; // Increased delay range
    timerRef.current = window.setTimeout(() => {
      setStatus('ready');
      startTimeRef.current = Date.now();
    }, delay);
  }, []);
  
  useEffect(() => {
    startTest();
    return () => {
      if(timerRef.current) clearTimeout(timerRef.current);
    }
  }, [startTest]);

  useEffect(() => {
    if (times.length === ATTEMPTS) {
      const averageTime = times.reduce((a, b) => a + b, 0) / times.length;
      onComplete({ game: 'Reaction Test', score: Math.round(averageTime), metric: 'ms average' });
    }
  }, [times, onComplete]);

  const handleClick = () => {
    if (status === 'ready') {
      const endTime = Date.now();
      const reactionTime = endTime - startTimeRef.current;
      setTimes([...times, reactionTime]);
      setStatus('clicked');
      setTimeout(() => {
          if (times.length < ATTEMPTS) {
             setStatus('waiting');
             startTest();
          }
      }, 1500);
    } else if (status === 'waiting') {
      if(timerRef.current) clearTimeout(timerRef.current);
      setTimes([...times, 0]); // Penalty for early click
      setStatus('clicked');
      setTimeout(() => {
          if (times.length < ATTEMPTS) {
             setStatus('waiting');
             startTest();
          }
      }, 1500);
    }
  };

  const getBackgroundColor = () => {
    if (status === 'waiting') return 'bg-sky-600';
    if (status === 'ready') return 'bg-emerald-500';
    if (status === 'clicked') return times[times.length - 1] === 0 ? 'bg-red-500' : 'bg-slate-700';
    return 'bg-sky-600';
  }

  const getButtonText = () => {
    if (times.length === ATTEMPTS) return `Finished!`;
    if (status === 'waiting') return 'Wait for Green...';
    if (status === 'ready') return 'Click Now!';
    if (status === 'clicked') return times[times.length - 1] === 0 ? 'Too early!' : `Time: ${times[times.length - 1]}ms`;
    return 'Wait...';
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-2">Reaction Test</h2>
      <p className="text-center text-slate-600 mb-6 text-lg">Click the box when it turns green. <span className="font-semibold">Attempt {Math.min(times.length + 1, ATTEMPTS)} of {ATTEMPTS}</span></p>
      <div className="w-full">
        <button
          onClick={handleClick}
          className={`w-full h-80 rounded-lg text-white text-4xl font-bold transition-colors duration-200 flex justify-center items-center shadow-lg ${getBackgroundColor()}`}
        >
          {getButtonText()}
        </button>
      </div>
       <div className="mt-6 text-center w-full">
            <h3 className="font-semibold text-slate-700">Your Times:</h3>
            <div className="flex justify-center gap-4 text-lg p-2 bg-slate-100 rounded-lg mt-2">
                {Array.from({ length: ATTEMPTS }).map((_, i) => 
                    <span key={i} className="font-mono w-20 text-center">{times[i] !== undefined ? (times[i] === 0 ? 'FAIL' : `${times[i]}ms`) : '...'}</span>
                )}
            </div>
        </div>
    </div>
  );
};

export default ReactionTest;