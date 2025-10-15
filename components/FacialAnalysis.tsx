import React, { useEffect, useRef, useState } from 'react';
import { GameResult } from '../types';

interface FacialAnalysisProps {
  onComplete: (result: GameResult) => void;
}

const analysisSteps = [
    "Initializing camera...",
    "Calibrating facial tracking...",
    "Analyzing eye movement...",
    "Detecting micro-expressions...",
    "Assessing emotional response...",
    "Finalizing analysis..."
];

const FacialAnalysis: React.FC<FacialAnalysisProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [statusMessage, setStatusMessage] = useState(analysisSteps[0]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setError("Could not access camera. Please ensure permissions are granted and refresh the page.");
      }
    };

    startCamera();

    const timeouts = analysisSteps.map((step, index) => 
        setTimeout(() => {
            setStatusMessage(step);
            if (index === analysisSteps.length - 1) {
                setTimeout(() => {
                    onComplete({ game: 'Facial Analysis', score: Math.floor(Math.random() * 10) + 1, metric: 'inconsistencies' });
                }, 2000);
            }
        }, index * 2500)
    );
    
    return () => {
      timeouts.forEach(clearTimeout);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-2">Facial Expression Analysis</h2>
      <p className="text-center text-slate-600 mb-6 text-lg">Please look at the camera and maintain a neutral expression.</p>
      <div className="relative w-full max-w-2xl mx-auto aspect-video bg-black rounded-lg overflow-hidden shadow-lg border-4 border-slate-200">
        {error ? (
          <div className="w-full h-full flex items-center justify-center text-red-500 p-4">{error}</div>
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-2 bg-sky-400 animate-scan"></div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-60 text-white text-center font-mono">
            <p>{statusMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default FacialAnalysis;