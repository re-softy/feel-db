"use client";

import { useEffect, useState } from "react";
import EmotionButton from "./EmotionButton";
import { getEmotions } from "@/lib/api";
import { Emotion, RateMovieProps } from "@/types/types";


function RateMovie({
  border = false,
  rows = 1,
  showConfirm = true,
  cursorPointer = true,
  className,
}: RateMovieProps) {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmotions = async () => {
      const data = await getEmotions();
      const emotions = data?.emotions ?? [];
      if (emotions) {
        setEmotions(emotions);
      }
    };

    fetchEmotions();
  }, []);

  const handleClick = (emotionName: string) => {
    setSelectedEmotion(emotionName);
  };

  const handleConfirm = () => {
    if (selectedEmotion) {
      alert(`You selected: ${selectedEmotion}`);
    }
  };
  
  const gridClass = rows === 1
      ? "grid-cols-1 md:grid-cols-2 md:gap-x-6 lg:grid-cols-1 overflow-y-auto pr-2 max-h-64 sm:max-h-80 md:max-h-96 lg:max-h-[400px] xl:max-h-[500px]"
      : "grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-[1px] h-[330px]";

  return (
    <div
      className={`rounded-lg ${className} ${
        border ? "hidden lg:block border border-[#262626] p-6" : ""
      }`}
    >
      {border && <p className="text-xl lg:text-2xl mb-1 font-medium">Emotions</p>}
      {!border && <p className="text-xl xl:text-2xl mb-2 font-medium">Rate the Movie</p>}

        <div className={`grid ${gridClass} pr-2 overflow-y-auto`}>
          {emotions.map((emotion) => (
            <EmotionButton
              key={emotion.id}
              svg={emotion.name}
              label={emotion.name}
              onClick={() => handleClick(emotion.name)}
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
}

export default RateMovie;
