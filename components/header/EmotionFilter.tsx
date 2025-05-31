import Image from "next/image";
import { useState } from "react";

import { Slider } from "@/components/ui/slider";
import { EmotionFilterProps } from "@/types/types";

function EmotionFilter({ emotions, genres, onClose, filterState, filterHandlers, onSearch }: EmotionFilterProps) {
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [showAllImdbRatings, setShowAllImdbRatings] = useState(false);

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

  const getEmotionIcon = (name: string) => {
    return `/emotions/${name.toLowerCase()}.svg`;
  };

  const minYear = 1936;
  const maxYear = new Date().getFullYear();

  const imdbRatings = [
    "1.0 or more", "2.0 or more", "3.0 or more", "4.0 or more",
    "5.0 or more", "6.0 or more", "7.0 or more", "8.0 or more", "9.0 or more"
  ];

  return (
    <div className="max-h-[80vh] overflow-y-auto px-6 py-4 relative bg-black">
      <div className="flex justify-end md:col-span-2">
        <button
          onClick={onClose}
          className="text-white text-2xl p-2 z-10 hover:bg-gray-800 rounded-full transition"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-6 md:gap-y-10">
        <h2 className="text-xl md:text-2xl self-center">
          Emotion Filter
        </h2>
        <div className="flex flex-wrap gap-2 md:col-start-2 transition-all duration-300 overflow-hidden">
          {emotions.map((emotion) => (
            <div
              key={emotion.id}
              onClick={() => handleEmotionSelect(emotion.id)}
              className={`flex items-center gap-2 px-4 py-2 md:px-6 rounded-lg border transition-colors text-sm md:text-base 2xl:text-[20px] cursor-pointer ${selectedEmotions.includes(emotion.id)
                ? "bg-white text-black"
                : "border-gray-600 text-white hover:border-gray-400"
                }`}
            >
              <Image
                src={getEmotionIcon(emotion.name)}
                alt={emotion.name}
                width={16}
                height={16}
                className="w-[24px] lg:w-[26px] xl:w-[28px] 2xl:w-[30px]"
              />
              {emotion.name}
            </div>
          ))}
        </div>

        <h3 className="text-xl md:text-2xl self-center">Genres</h3>
        <div className="flex flex-wrap gap-2 md:col-start-2 transition-all duration-300 overflow-hidden"
          style={{
            maxHeight: showAllGenres ? "1000px" : "42px",
          }}>
          {genres.map((genre) => (
            <div
              key={genre.id}
              onClick={() => handleGenreSelect(genre.id)}
              className={`px-4 py-2 md:px-8 rounded-lg border transition-colors text-sm md:text-base 2xl:text-[20px] cursor-pointer ${selectedGenres.includes(genre.id)
                ? "bg-white text-black"
                : "border-gray-600 text-white hover:border-gray-400"
                }`}
            >
              {genre.genre}
            </div>
          ))}
        </div>

        {genres.length > 0 && (
          <div className="md:col-start-2">
            <button
              onClick={() => setShowAllGenres((prev) => !prev)}
              className="text-sm xl:text-lg text-orange"
            >
              {showAllGenres ? "See Less" : "See More"}
            </button>
          </div>
        )}

        <h3 className="text-xl md:text-2xl self-center">IMDB</h3>
        <div className="flex flex-wrap gap-2 md:col-start-2 transition-all duration-300 overflow-hidden"
          style={{
            maxHeight: showAllImdbRatings ? "1000px" : "42px",
            transition: "max-height 0.3s ease-in-out",
          }}>
          {imdbRatings.map((rating) => (
            <div
              key={rating}
              onClick={() => handleImdbRatingSelect(rating)}
              className={`px-4 py-2 md:px-8 rounded-lg border transition-colors text-sm md:text-base 2xl:text-[20px] cursor-pointer ${selectedImdbRating === rating
                  ? "bg-white text-black"
                  : "border-gray-600 text-white hover:border-gray-400"
                }`}
            >
              {rating}
            </div>
          ))}
        </div>

        {imdbRatings.length > 0 && (
          <div className="md:col-start-2 block 3xl:hidden">
            <button
              onClick={() => setShowAllImdbRatings((prev) => !prev)}
              className="text-sm xl:text-lg text-orange"
            >
              {showAllImdbRatings ? "See Less" : "See More"}
            </button>
          </div>
        )}

        <h3 className="text-xl md:text-2xl self-center">Year</h3>
        <div className="relative mt-6 md:col-start-2">
          <Slider
            defaultValue={[minYear, maxYear]}
            min={minYear}
            max={maxYear}
            step={1}
            value={yearRange}
            onValueChange={(values) => {
              handleYearRangeSelect(values);
            }}
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
      </div>

      <button className="px-8 py-2 bg-orange border border-white text-white rounded-full transition-colors my-10"
        onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

export default EmotionFilter;