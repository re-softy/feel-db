// 'use client';
// import { useState } from "react";
// import Image from "next/image";
// // import { EmotionFilterProps } from "@/types/types";

// function EmotionFilter({ emotions, categories, genres, isLoading, onClose }: EmotionFilterProps) {
//   const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
//   const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
//   const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
//   const [selectedImdbRating, setSelectedImdbRating] = useState<string | null>(null);
//   const [yearRange, setYearRange] = useState({ startYear: 1995, endYear: 2022 });
  
//   const handleEmotionSelect = (id: number) => {
//     setSelectedEmotion(selectedEmotion === id ? null : id);
//   };

//   const handleCategorySelect = (id: number) => {
//     setSelectedCategory(selectedCategory === id ? null : id);
//   };

//   const handleGenreSelect = (id: number) => {
//     setSelectedGenres(
//       selectedGenres.includes(id)
//         ? selectedGenres.filter(genreId => genreId !== id)
//         : [...selectedGenres, id]
//     );
//   };
  
//   const handleImdbRatingSelect = (rating: string) => {
//     setSelectedImdbRating(selectedImdbRating === rating ? null : rating);
//   };

//   const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     setYearRange({
//       ...yearRange,
//       [name]: parseInt(value)
//     });
//   };

//   const getEmotionIcon = (name: string) => {
//     return `/emotions/${name.toLowerCase()}.svg`;
//   };

//   return (
//     <div className="max-h-[80vh] overflow-y-auto p-6 relative">
//       <button 
//         onClick={onClose}
//         className="absolute right-4 top-4 text-white text-2xl"
//       >
//         ✕
//       </button>
      
//       <div className="grid grid-cols-[150px_1fr] gap-y-12">
//         {/* Emotion Filter Section */}
//         <h2 className="text-2xl self-center">Emotion Filter</h2>
//         <div className="flex flex-wrap gap-4">
//           {emotions.map((emotion) => (
//             <button
//               key={emotion.id}
//               onClick={() => handleEmotionSelect(emotion.id)}
//               className={`${selectedEmotion === emotion.id ? 'border-2 border-white rounded-full' : ''}`}
//             >
//               <div className="w-8 h-8 relative">
//                 <Image
//                   src={getEmotionIcon(emotion.name)}
//                   alt={emotion.name}
//                   width={48}
//                   height={48}
//                   className="object-contain"
//                 />
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* Category Section */}
//         <h2 className="text-2xl self-center">Category</h2>
//         <div className="flex flex-wrap gap-2">
//           {categories.map((category) => (
//             <button
//               key={category.id}
//               onClick={() => handleCategorySelect(category.id)}
//               className={`px-8 py-2 rounded-lg border transition-colors ${
//                 selectedCategory === category.id
//                   ? "bg-white text-black"
//                   : "border-gray-600 text-white hover:border-gray-400"
//               }`}
//             >
//               {category.name}
//             </button>
//           ))}
//         </div>

//         {/* Genre Section */}
//         <h3 className="text-2xl self-center">Genre</h3>
//         <div className="flex flex-wrap gap-2">
//           {genres.map((genre) => (
//             <button
//               key={genre.id}
//               onClick={() => handleGenreSelect(genre.id)}
//               className={`px-8 py-2 rounded-lg border transition-colors ${
//                 selectedGenres.includes(genre.id)
//                   ? "bg-white text-black"
//                   : "border-gray-600 text-white hover:border-gray-400"
//               }`}
//             >
//               {genre.genre}
//             </button>
//           ))}
//         </div>

//         {/* IMDB Section */}
//         <h3 className="text-2xl self-center">IMDB</h3>
//         <div className="flex flex-wrap gap-2">
//           {["1.0 or more", "2.0 or more", "3.0 or more", "4.0 or more", "5.0 or more", 
//             "6.0 or more", "7.0 or more", "8.0 or more", "9.0 or more"].map((rating) => (
//             <button
//               key={rating}
//               onClick={() => handleImdbRatingSelect(rating)}
//               className={`px-8 py-2 rounded-lg border transition-colors ${
//                 selectedImdbRating === rating
//                   ? "bg-white text-black"
//                   : "border-gray-600 text-white hover:border-gray-400"
//               }`}
//             >
//               {rating}
//             </button>
//           ))}
//         </div>
//       </div>
//         <button className="px-8 py-2 bg-orange border border-white text-white rounded-full transition-colors mt-6">
//           Search
//         </button>
//     </div>
//   );
// }

// export default EmotionFilter;