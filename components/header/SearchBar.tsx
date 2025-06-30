'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchBarProps } from "@/types/types";
import CategoriesButton from './CategoriesButton';
import SearchInput from './SearchInput';
import FilterToggle from './FilterToggle';

function SearchBar({
    emotionsData,
    categoriesData,
    genresData,
}: SearchBarProps) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedEmotions, setSelectedEmotions] = useState<number[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedImdbRating, setSelectedImdbRating] = useState<string | null>(null);
    const [yearRange, setYearRange] = useState<number[]>([1936, new Date().getFullYear()]);

    const router = useRouter();
    
    if (!emotionsData || !categoriesData || !genresData) {
        return (
            <div className="w-[94%] md:w-[86%] xl:w-[70%] flex mx-auto">
                <div className="flex items-center w-full border-grey border-[1.5px] rounded-2xl h-8 md:h-10">
                    <div className="flex items-center justify-center w-full">
                        <span className="text-gray-400">Loading search...</span>
                    </div>
                </div>
            </div>
        );
    }

    const handleEmotionSelect = (id: number) => {
        setSelectedEmotions(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(emotionId => emotionId !== id);
            } else if (prevSelected.length < 3) {
                return [...prevSelected, id];
            } else {
                return [...prevSelected.slice(1), id];
            }
        });
    };

    const handleCategorySelect = (id: number) => {
        setSelectedCategory(selectedCategory === id ? null : id);
    };

    const handleGenreSelect = (id: number) => {
        setSelectedGenres(prevSelected => {
            const newSelected = prevSelected.includes(id)
                ? prevSelected.filter(genreId => genreId !== id)
                : prevSelected.length < 3
                    ? [...prevSelected, id]
                    : [...prevSelected.slice(1), id];
            return newSelected;
        });
    };

    const handleImdbRatingSelect = (rating: string) => {
        setSelectedImdbRating(selectedImdbRating === rating ? null : rating);
    };

    const handleYearRangeSelect = (range: number[]) => {
        setYearRange(range);
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(e.target.value);
    };

    const handleFilterSearch = () => {
        const params = new URLSearchParams();
        const currentYear = new Date().getFullYear();

        const trimmedKeyword = searchKeyword.trim();
        if (trimmedKeyword) {
            params.append('keyword', trimmedKeyword);
        }

        if (selectedEmotions.length > 0) {
            selectedEmotions.forEach(emotionId => {
                params.append('emotion', emotionId.toString());
            });
        }

        if (selectedCategory !== null) {
            const categoryName = categoriesData.find((cat: any) => cat.id === selectedCategory)?.name;
            if (categoryName) {
                params.append('category', categoryName);
            }
        }

        if (selectedGenres.length > 0) {
            selectedGenres.forEach((genreId) => {
                params.append('genre', genreId.toString());
            });
        }

        if (selectedImdbRating) {
            const match = selectedImdbRating.match(/(\d+\.\d+)/);
            if (match) {
                params.append('imdb_min', parseFloat(match[0]).toString());
            }
        }

        if (yearRange[0] !== 1936 || yearRange[1] !== currentYear) {
            if (yearRange[0] !== 1936) {
                params.append('year_min', yearRange[0].toString());
            }
            if (yearRange[1] !== currentYear) {
                params.append('year_max', yearRange[1].toString());
            }
        }

        const searchUrl = params.toString() ? `/search?${params.toString()}` : '/search';
        router.push(searchUrl);
    };

    const filterState = {
        selectedEmotions,
        selectedCategory,
        selectedGenres,
        selectedImdbRating,
        yearRange,
    };

    const filterHandlers = {
        handleEmotionSelect,
        handleCategorySelect,
        handleGenreSelect,
        handleImdbRatingSelect,
        handleYearRangeSelect,
    };

    return (
        <div className="w-[94%] md:w-[86%] xl:w-[70%] flex mx-auto gap-2">
            <div className="flex items-center w-full border-grey border-[1.5px] rounded-2xl h-8 md:h-10">
                <div className="flex items-center pl-4">
                    <CategoriesButton 
                        categories={categoriesData}
                        selectedCategory={selectedCategory}
                        onCategorySelect={handleCategorySelect}
                    />
                </div>
                <div className="relative w-full">
                    <SearchInput
                        emotionsData={emotionsData}
                        categoriesData={categoriesData}
                        genresData={genresData}
                        filterState={filterState}
                        filterHandlers={filterHandlers}
                        searchKeyword={searchKeyword}
                        onSearchKeywordChange={handleSearchInputChange}
                        onSearch={handleFilterSearch}
                    />
                </div>
            </div>
            <FilterToggle
                emotionsData={emotionsData}
                categoriesData={categoriesData}
                genresData={genresData}
                filterState={filterState}
                filterHandlers={filterHandlers}
                onSearch={handleFilterSearch}
            />
        </div>
    );
}

export default SearchBar;