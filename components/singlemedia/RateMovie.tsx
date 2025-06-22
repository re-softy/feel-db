"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import EmotionButton from "./EmotionButton";
import { voteEmotionAction } from "@/lib/actions/vote-actions";
import { Emotion, RateMovieProps } from "@/types/types";

function RateMovie({
  collectionId,
  emotions,
}: RateMovieProps & { emotions: Emotion[] }) {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedEmotionIds, setSelectedEmotionIds] = useState<number[]>([]);

  const handleClick = useCallback((emotionName: string) => {
    const emotion = emotions.find((e) => e.name === emotionName);
    if (!emotion) return;

    if (selectedEmotions.includes(emotionName)) {
      setSelectedEmotions((prev) => prev.filter((e) => e !== emotionName));
      setSelectedEmotionIds((prev) => prev.filter((id) => id !== emotion.id));
    } else if (selectedEmotions.length < 3) {
      setSelectedEmotions((prev) => [...prev, emotionName]);
      setSelectedEmotionIds((prev) => [...prev, emotion.id]);
    }
  }, [emotions, selectedEmotions]);

  const handleConfirm = useCallback(async () => {
    if (selectedEmotions.length === 0) {
      toast.error("Please select at least one emotion");
      return;
    }

    try {
      const result = await voteEmotionAction(collectionId, selectedEmotionIds);
      if (result.success) {
        toast.success(`Successfully voted for: ${selectedEmotions.join(", ")}`);
        setSelectedEmotions([]);
        setSelectedEmotionIds([]);
      } else {
        toast.error(`Error: ${result.error}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to submit vote";
      toast.error(`Error: ${errorMessage}`);
    }
  }, [collectionId, selectedEmotionIds, selectedEmotions]);

  return (
    <div className="flex flex-col">
      <p className="text-xl xl:text-2xl mb-2 font-medium">Rate the Movie</p>

      <div className="mb-2 text-sm text-gray-400">
        Select up to 3 emotions ({selectedEmotions.length}/3)
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 sm:gap-x-6 lg:grid-cols-1 overflow-y-auto pr-2 max-h-[60vh] sm:max-h-[50vh] xl:max-h-[70vh]">
        {emotions.map((emotion) => (
          <EmotionButton
            key={emotion.id}
            svg={emotion.name}
            label={emotion.name}
            onClick={() => handleClick(emotion.name)}
            isSelected={selectedEmotions.includes(emotion.name)}
          />
        ))}
      </div>

      <button
        className="mt-4 w-3/5 p-2 py-1 bg-orange rounded-2xl uppercase hover:bg-orange/90 transition-colors self-center"
        onClick={handleConfirm}
      >
        Confirm
      </button>
    </div>
  );
}

export default RateMovie;