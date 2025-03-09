
import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  seconds: number;
  onComplete: () => void;
  onCancel?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  seconds, 
  onComplete, 
  onCancel 
}) => {
  const [count, setCount] = useState<number>(seconds);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (!isActive) return;

    if (count <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount(prevCount => prevCount - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, isActive, onComplete]);

  const handleCancel = () => {
    setIsActive(false);
    if (onCancel) onCancel();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10">
      <div className="relative z-20 flex flex-col items-center">
        {count > 0 && (
          <div className="text-8xl font-bold text-white drop-shadow-lg animate-count-animation">
            {count}
          </div>
        )}
        {onCancel && (
          <button 
            onClick={handleCancel} 
            className="mt-8 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium 
                       hover:bg-white/30 transition-all duration-200"
          >
            Cancel
          </button>
        )}
      </div>
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"></div>
    </div>
  );
};

export default CountdownTimer;

