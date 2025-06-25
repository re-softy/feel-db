import Image from "next/image";
import { useState, useCallback, useMemo } from "react";

import { Slider } from "@/components/ui/slider";
import { EmotionFilterProps } from "@/types/types";

function EmotionFilter({ emotions, genres, onClose, filterState, filterHandlers, onSearch }: EmotionFilterProps) {
  const [showAllFilters, setShowAllFilters] = useState(false);

  const {
    selectedEmotions,
    selectedGenres,
    selectedImdbRating,
    yearRange
  } = filterState;

  const {
    handleEmotionSelect,
    handleGenreSelect,
    handleImdbRatingSelect,
    handleYearRangeSelect
  } = filterHandlers;

  const getEmotionIcon = useCallback((name: string) => {
    return `/emotions/${name.toLowerCase()}.svg`;
  }, []);

  const { minYear, maxYear, imdbRatings } = useMemo(() => ({
    minYear: 1936,
    maxYear: new Date().getFullYear(),
    imdbRatings: [
      "1.0 or more", "2.0 or more", "3.0 or more", "4.0 or more",
      "5.0 or more", "6.0 or more", "7.0 or more", "8.0 or more", "9.0 or more"
    ]
  }), []);

  const toggleShowAllFilters = useCallback(() => {
    setShowAllFilters(prev => !prev);
  }, []);

  return (
    <div className="max-h-[80vh] overflow-y-auto px-6 py-4 relative bg-black">
      <div className="flex justify-end md:col-span-2">
        <button
          onClick={onClose}
          className="text-white text-2xl px-2 z-10 rounded-full hover:bg-gray-800"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-6 md:gap-y-10">
        <h2 className="text-xl md:text-2xl self-center">
          Emotion Filter
        </h2>
        <div className="flex flex-wrap gap-2 md:col-start-2 overflow-hidden">
          {emotions.map((emotion) => {
            const isSelected = selectedEmotions.includes(emotion.id);
            return (
              <div
                key={emotion.id}
                onClick={() => handleEmotionSelect(emotion.id)}
                className={`flex items-center gap-2 px-4 py-2 md:px-6 rounded-lg border cursor-pointer text-sm md:text-base 2xl:text-[20px] ${
                  isSelected
                    ? "bg-white text-black border-white"
                    : "border-gray-600 text-white hover:border-gray-400"
                }`}
              >
                <Image
                  src={getEmotionIcon(emotion.name)}
                  alt={emotion.name}
                  width={16}
                  height={16}
                  className="w-[24px] lg:w-[26px] xl:w-[28px] 2xl:w-[30px]"
                  priority={false}
                  loading="lazy"
                />
                {emotion.name}
              </div>
            );
          })}
        </div>

        {!showAllFilters && (
          <div className="md:col-start-2">
            <button
              onClick={toggleShowAllFilters}
              className="text-sm xl:text-lg text-orange hover:brightness-110"
            >
              See More Filters
            </button>
          </div>
        )}

        {showAllFilters && (
          <>
            <h3 className="text-xl md:text-2xl self-center">Genres</h3>
            <div className="flex flex-wrap gap-2 md:col-start-2 overflow-hidden">
              {genres.map((genre) => {
                const isSelected = selectedGenres.includes(genre.id);
                return (
                  <div
                    key={genre.id}
                    onClick={() => handleGenreSelect(genre.id)}
                    className={`px-4 py-2 md:px-8 rounded-lg border cursor-pointer text-sm md:text-base 2xl:text-[20px] ${
                      isSelected
                        ? "bg-white text-black border-white"
                        : "border-gray-600 text-white hover:border-gray-400"
                    }`}
                  >
                    {genre.genre}
                  </div>
                );
              })}
            </div>

            <h3 className="text-xl md:text-2xl self-center">IMDB</h3>
            <div className="flex flex-wrap gap-2 md:col-start-2 overflow-hidden">
              {imdbRatings.map((rating) => (
                <div
                  key={rating}
                  onClick={() => handleImdbRatingSelect(rating)}
                  className={`px-4 py-2 md:px-8 rounded-lg border cursor-pointer text-sm md:text-base 2xl:text-[20px] ${
                    selectedImdbRating === rating
                      ? "bg-white text-black border-white"
                      : "border-gray-600 text-white hover:border-gray-400"
                  }`}
                >
                  {rating}
                </div>
              ))}
            </div>

            <h3 className="text-xl md:text-2xl self-center">Year</h3>
            <div className="relative mt-6 md:col-start-2">
              <Slider
                defaultValue={[minYear, maxYear]}
                min={minYear}
                max={maxYear}
                step={1}
                value={yearRange}
                onValueChange={handleYearRangeSelect}
                className="w-full md:w-[60%] flex items-center"
              />

              <div className="relative mt-6 w-full md:w-[60%] mb-10">
                <div
                  className="absolute transform -translate-x-1/2"
                  style={{
                    left: `${Math.max(3, ((yearRange[0] - minYear) / (maxYear - minYear)) * 100)}%`
                  }}
                >
                  <div className="bg-[#FFCCB9] rounded-full text-black text-xs md:text-sm font-medium px-3 py-1 md:px-4 min-w-[50px] md:min-w-[60px] text-center">
                    {yearRange[0]}
                  </div>
                </div>

                <div
                  className="absolute transform -translate-x-1/2"
                  style={{
                    left: `${Math.min(97, ((yearRange[1] - minYear) / (maxYear - minYear)) * 100)}%`
                  }}
                >
                  <div className="bg-[#FFCCB9] rounded-full text-black text-xs md:text-sm font-medium px-3 py-1 md:px-4 min-w-[50px] md:min-w-[60px] text-center">
                    {yearRange[1]}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-start-2">
              <button
                onClick={toggleShowAllFilters}
                className="text-sm xl:text-lg text-orange hover:brightness-110"
              >
                See Less Filters
              </button>
            </div>
          </>
        )}
      </div>

      <button 
        className="px-8 py-2 bg-orange border border-white text-white rounded-full my-10 hover:brightness-110"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
}

export default EmotionFilter;