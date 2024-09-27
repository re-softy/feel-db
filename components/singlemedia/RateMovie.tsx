"use client"

import { useState } from 'react';
import EmotionButton from './EmotionButton';

const emotions = [
  { label: 'Happiness', svg: "/emotions/happiness.svg" },
  { label: 'Sadness', svg: "/emotions/sadness.svg" },
  { label: 'Fear', svg: "/emotions/fear.svg" },
  { label: 'Anger', svg: "/emotions/anger.svg" },
  { label: 'Surprise/Shock', svg: "/emotions/surprise.svg" },
  { label: 'Disgust', svg: "/emotions/disgust.svg" },
  { label: 'Love', svg: "/emotions/love.svg" },
  { label: 'Tension', svg: "/emotions/tension.svg" },
  { label: 'Nostalgia', svg: "/emotions/nostalgia.svg" },
  { label: 'Smile', svg: "/emotions/smile.svg" },
  { label: 'Inspiration', svg: "/emotions/inspiration.svg" },
  { label: 'Sympathy', svg: "/emotions/sympathy.svg" }
];

interface RateMovieProps {
  border?: boolean;       
  rows?: number;          
  showConfirm?: boolean;  
  cursorPointer?: boolean; 
}

const RateMovie: React.FC<RateMovieProps> = ({
  border = false,
  rows = 1,
  showConfirm = true,
  cursorPointer = true
}) => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const handleClick = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  const handleConfirm = () => {
    if (selectedEmotion) {
      alert(`You selected: ${selectedEmotion}`);
    }
  };


  const gridClass = rows === 1 ? 'grid-cols-1' : 'grid-cols-2 gap-x-10 gap-y-[1px]';

  return (
    <div className={`bg-black rounded-lg w-64 ${border ? 'border border-[#262626] p-6 w-full' : ''}`}>
      <h2 className="text-white text-lg mb-4 font-medium">Rate the Movie</h2>
      <div className={`grid ${gridClass}`}>
        {emotions.map((emotion) => (
          <EmotionButton
          key={emotion.label}
          svg={emotion.svg}
          label={emotion.label}
          onClick={() => handleClick(emotion.label)}
          cursorPointer={cursorPointer}
        /> 
        ))}
      </div>
      {showConfirm && (
        <button
          className="mt-4 w-full p-2 py-1 bg-orange rounded-2xl uppercase"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      )}
    </div>
  );
};

export default RateMovie;
