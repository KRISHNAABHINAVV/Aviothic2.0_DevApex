import React, { useState, useEffect, useCallback } from 'react';
import { GameResult } from '../../types';

interface PatternGameProps {
  onComplete: (result: GameResult) => void;
}

const colors = [
    { base: 'bg-red-500', ring: 'ring-red-300' },
    { base: 'bg-blue-500', ring: 'ring-blue-300' },
    { base: 'bg-green-500', ring: 'ring-green-300' },
    { base: 'bg-yellow-400', ring: 'ring-yellow-200' },
];

const PatternGame: React.FC<PatternGameProps> = ({ onComplete }) => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [level, setLevel] = useState(0);
  const [gameState, setGameState] = useState<'watching' | 'playing' | 'gameover'>('watching');
  const [activeButton, setActiveButton] = useState<number | null>(null);

  const nextLevel = useCallback(() => {
    setGameState('watching');
    setPlayerSequence([]);
    setLevel(prev => prev + 1);
    const nextInSequence = Math.floor(Math.random() * colors.length);
    const newSequence = [...sequence, nextInSequence];
    setSequence(newSequence);

    newSequence.forEach((colorIndex, i) => {
      setTimeout(() => {
        setActiveButton(colorIndex);
        setTimeout(() => setActiveButton(null), 400);
      }, (i + 1) * 700);
    });

    setTimeout(() => {
      setGameState('playing');
    }, newSequence.length * 700 + 500);
  }, [sequence]);

  useEffect(() => {
    setTimeout(nextLevel, 500);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlayerInput = (index: number) => {
    if (gameState !== 'playing') return;

    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameState('gameover');
      setTimeout(() => {
        onComplete({ game: 'Pattern Game', score: level - 1, metric: 'levels completed' });
      }, 1500);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setTimeout(nextLevel, 1000);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-2">Pattern Game</h2>
      <p className="text-center text-slate-600 mb-6 text-lg">Repeat the sequence. <span className="font-semibold">Level: {level}</span></p>
      {gameState === 'gameover' && <p className="text-center text-red-500 font-bold text-xl animate-pulse">Game Over!</p>}
      <div className="grid grid-cols-2 gap-6 max-w-sm mx-auto aspect-square w-full">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => handlePlayerInput(index)}
            className={`rounded-full transition-all duration-200 focus:outline-none ${color.base} ${activeButton === index ? 'opacity-100 scale-105 ring-8 ring-opacity-50 ' + color.ring : 'opacity-70 hover:opacity-90'}`}
            disabled={gameState !== 'playing'}
          />
        ))}
      </div>
    </div>
  );
};

export default PatternGame;