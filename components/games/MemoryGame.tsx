import React, { useState, useEffect, useCallback } from 'react';
import { GameResult } from '../../types';

interface MemoryGameProps {
  onComplete: (result: GameResult) => void;
}

const BrainIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5v1.4a3.5 3.5 0 0 0-2.5 3.1 3.5 3.5 0 0 0 2.5 3.9v1.6a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-1.6a3.5 3.5 0 0 0 2.5-3.9 3.5 3.5 0 0 0-2.5-3.1V6.5A4.5 4.5 0 0 0 12 2Z" />
        <path d="M12 11.5a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 1-5 0v0a2.5 2.5 0 0 1 2.5-2.5Z" />
        <path d="M12 22v-3" />
        <path d="M12 17H7" />
        <path d="M12 17h5" />
    </svg>
);

const symbols = ['🧠', '💊', '🧬', '❤️', '🔬', '🩺', '💡', '🌟'];
const cardValues = [...symbols, ...symbols];

const shuffle = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete }) => {
  const [cards, setCards] = useState(() => shuffle(cardValues).map((value, index) => ({ id: index, value, isFlipped: false, isMatched: false })));
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [isChecking, setIsChecking] = useState(false);

  const handleCardClick = (index: number) => {
    if (isChecking || flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);
  };

  const checkMatch = useCallback(() => {
    if (flippedIndices.length !== 2) return;

    setIsChecking(true);
    const [firstIndex, secondIndex] = flippedIndices;
    const newCards = [...cards];

    if (newCards[firstIndex].value === newCards[secondIndex].value) {
      newCards[firstIndex].isMatched = true;
      newCards[secondIndex].isMatched = true;
      setTimeout(() => {
        setCards(newCards);
        setFlippedIndices([]);
        setIsChecking(false);
      }, 600);
    } else {
      setMistakes(prev => prev + 1);
      setTimeout(() => {
        newCards[firstIndex].isFlipped = false;
        newCards[secondIndex].isFlipped = false;
        setCards(newCards);
        setFlippedIndices([]);
        setIsChecking(false);
      }, 1200);
    }
  }, [flippedIndices, cards]);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      checkMatch();
    }
  }, [flippedIndices, checkMatch]);

  useEffect(() => {
    const matchedCards = cards.filter(card => card.isMatched).length;
    if (cards.length > 0 && matchedCards === cards.length) {
      setTimeout(() => {
        onComplete({ game: 'Memory Game', score: mistakes, metric: 'mistakes' });
      }, 500);
    }
  }, [cards, mistakes, onComplete]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-2">Memory Game</h2>
      <p className="text-center text-slate-600 mb-6 text-lg">Match all the pairs. <span className="font-semibold">Mistakes: {mistakes}</span></p>
      <div className="grid grid-cols-4 gap-4 max-w-md mx-auto w-full">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className="perspective-1000"
            onClick={() => handleCardClick(index)}
          >
            <div
              className={`relative w-full aspect-square transition-transform duration-700 ease-in-out ${card.isFlipped || card.isMatched ? 'rotate-y-180' : ''}`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card Back */}
              <div className="absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center bg-slate-700 hover:bg-slate-600 cursor-pointer shadow-md">
                 <BrainIcon className="w-10 h-10 text-slate-400"/>
              </div>
              {/* Card Front */}
              <div className={`absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center text-5xl rotate-y-180 shadow-lg ${card.isMatched ? 'bg-green-400' : 'bg-sky-500'} ${card.isMatched ? 'opacity-70' : ''}`}>
                {card.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;