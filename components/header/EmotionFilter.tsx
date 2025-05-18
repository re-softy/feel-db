'use client';

import Image from "next/image";

import { Slider } from "@/components/ui/slider";
import { EmotionFilterProps } from "@/types/types";

function EmotionFilter({ emotions, categories, genres, onClose, filterState, filterHandlers, onSearch }: EmotionFilterProps) {

  const {
    selectedEmotion,
    selectedCategory,
    selectedGenres,
    selectedImdbRating
  } = filterState;

  const {
    handleEmotionSelect,
    handleCategorySelect,
    handleGenreSelect,
    handleImdbRatingSelect
  } = filterHandlers;

  const getEmotionIcon = (name: string) => {
    return `/emotions/${name.toLowerCase()}.svg`;
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto p-6 relative mt-[10px] bg-black">
      <button
        onClick={onClose}
        className="absolute right-4 top-4 text-white text-2xl"
      >
        ✕
      </button>

      <div className="grid grid-cols-[150px_1fr] gap-y-12">
        {/* Emotion Filter Section */}
        <h2 className="text-2xl self-center">Emotion Filter</h2>
        <div className="flex flex-wrap gap-4">
          {emotions.map((emotion) => (
            <button
              key={emotion.id}
              onClick={() => handleEmotionSelect(emotion.id)}
              className={`${selectedEmotion === emotion.id ? 'border-2 border-white rounded-full' : ''}`}
            >
              <div className="w-8 h-8 relative">
                <Image
                  src={getEmotionIcon(emotion.name)}
                  alt={emotion.name}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Category Section */}
        <h2 className="text-2xl self-center">Category</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`px-8 py-2 rounded-lg border transition-colors ${selectedCategory === category.id
                ? "bg-white text-black"
                : "border-gray-600 text-white hover:border-gray-400"
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Genre Section */}
        <h3 className="text-2xl self-center">Genre</h3>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreSelect(genre.id)}
              className={`px-8 py-2 rounded-lg border transition-colors ${selectedGenres.includes(genre.id)
                ? "bg-white text-black"
                : "border-gray-600 text-white hover:border-gray-400"
                }`}
            >
              {genre.genre}
            </button>
          ))}
        </div>

        {/* IMDB Section */}
        <h3 className="text-2xl self-center">IMDB</h3>
        <div className="flex flex-wrap gap-2">
          {["1.0 or more", "2.0 or more", "3.0 or more", "4.0 or more", "5.0 or more",
            "6.0 or more", "7.0 or more", "8.0 or more", "9.0 or more"].map((rating) => (
              <button
                key={rating}
                onClick={() => handleImdbRatingSelect(rating)}
                className={`px-8 py-2 rounded-lg border transition-colors ${selectedImdbRating === rating
                  ? "bg-white text-black"
                  : "border-gray-600 text-white hover:border-gray-400"
                  }`}
              >
                {rating}
              </button>
            ))}
        </div>
        {/* Year Range Section */}
        <h3 className="text-2xl self-center">Year</h3>
        <div className="relative mt-6">
          {/* <Slider
            defaultValue={[1995, 2022]}
            min={1995}
            max={2022}
            step={1}
            value={[yearRange.startYear, yearRange.endYear]}
            onValueChange={(values) => {
              setYearRange({
                startYear: values[0],
                endYear: values[1]
              });
            }}
            className="w-[40%] flex items-center"
          /> */}

          <div className="relative mt-6 w-[40%]">
            {/* <div 
              className="absolute transform -translate-x-1/2" 
              style={{ 
                left: `${((yearRange.startYear - 1995) / (2022 - 1995)) * 100}%` 
              }}
            >
              <div className="bg-orange rounded-full text-black text-sm font-medium px-4 py-1 min-w-[60px] text-center">
                {yearRange.startYear}
              </div>
            </div> */}
            {/* <div 
              className="absolute transform -translate-x-1/2" 
              style={{ 
                left: `${((yearRange.endYear - 1995) / (2022 - 1995)) * 100}%` 
              }}
            >
              <div className="bg-orange rounded-full text-black text-sm font-medium px-4 py-1 min-w-[60px] text-center">
                {yearRange.endYear}
              </div>
            </div> */}
          </div>
        </div>

      </div>
      <button className="px-8 py-2 bg-orange border border-white text-white rounded-full transition-colors mt-6"
      onClick={onSearch}>
        Search
      </button>
    </div>
  );
}

export default EmotionFilter;