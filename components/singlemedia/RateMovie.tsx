"use client";

import { useEffect, useState } from "react";
import EmotionButton from "./EmotionButton";
import { getEmotions, voteEmotion } from "@/lib/api";
import { Emotion, RateMovieProps } from "@/types/types";

function RateMovie({
  border = false,
  rows = 1,
  showConfirm = true,
  cursorPointer = true,
  className,
  collectionId,
}: RateMovieProps) {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedEmotionIds, setSelectedEmotionIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchEmotions = async () => {
      try {
        const data = await getEmotions();
        const emotions = data?.emotions ?? [];
        if (emotions) {
          setEmotions(emotions);
        }
      } catch (error) {
        console.error('Error fetching emotions:', error);
      }
    };

    fetchEmotions();
  }, []);

  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const handleClick = (emotionName: string) => {
    const emotion = emotions.find(e => e.name === emotionName);
    if (!emotion) return;

    if (selectedEmotions.includes(emotionName)) {
      setSelectedEmotions(prev => prev.filter(e => e !== emotionName));
      setSelectedEmotionIds(prev => prev.filter(id => id !== emotion.id));
    } else if (selectedEmotions.length < 3) {
      setSelectedEmotions(prev => [...prev, emotionName]);
      setSelectedEmotionIds(prev => [...prev, emotion.id]);
    }
  };

  const handleConfirm = async () => {
    if (selectedEmotions.length === 0) {
      alert('Please select at least one emotion');
      return;
    }
    
    try {
      // You'll need to get the token from your auth context/state
      const token = ""; // Replace with your actual token retrieval logic
      
      await voteEmotion(token, collectionId, selectedEmotionIds);
      
      alert(`Successfully voted for: ${selectedEmotions.join(', ')}`);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit vote';
      alert(`Error: ${errorMessage}`);
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
            cursorPointer={cursorPointer}
            onClick={() => handleClick(emotion.name)}
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