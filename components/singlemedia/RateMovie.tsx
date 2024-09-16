"use client"
import { useState } from 'react';
import EmotionButton from './EmotionButton';

const emotions = [
  { label: 'Happiness', emoji: "❤️" },
  { label: 'Sadness', emoji: "❤️" },
  { label: 'Fear', emoji: "❤️" },
  { label: 'Anger', emoji: "❤️" },
  { label: 'Surprise/Shock', emoji: "❤️" },
  { label: 'Disgust', emoji: "❤️" },
  { label: 'Love', emoji: "❤️"},
  { label: 'Tension', emoji: "❤️" },
  { label: 'Nostalgia', emoji: "❤️" },
  { label: 'Smile', emoji: "❤️" },
  { label: 'Inspiration', emoji: "❤️" },
  { label: 'Sympathy', emoji: "❤️" }
];

function RateMovie() {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const handleClick = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  const handleConfirm = () => {
    if (selectedEmotion) {
      alert(`You selected: ${selectedEmotion}`);
    }
  };

  return (
    <div className=" bg-black rounded-lg w-64">
      <h2 className="text-white text-lg mb-4 font-medium">Rate the Movie</h2>
      <div>
        {emotions.map((emotion) => (
          <EmotionButton
            key={emotion.label}
            emoji={emotion.emoji}
            label={emotion.label}
            onClick={() => handleClick(emotion.label)}
          />
        ))}
      </div>
      <button
        className="mt-4 w-full p-2 py-1 bg-[#ff7f50] rounded-2xl uppercase"
        onClick={handleConfirm}
      >
        confirm
      </button>
    </div>
  );
};

export default RateMovie;
