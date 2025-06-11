'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getEmotions, getCategories, getGenres } from "@/lib/api";

import { SearchBarProps } from "@/types/types";
import CategoriesButton from './CategoriesButton';
import SearchInput from './SearchInput';

function SearchBar({
    emotionsData,
    categoriesData,
    genresData,
    isDataLoading,
}: SearchBarProps) {
    const [searchKeyword, setSearchKeyword] = useState('');

    const [emotions, setEmotions] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [genres, setGenres] = useState<any[]>([]);

    const [selectedEmotions, setSelectedEmotions] = useState<number[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedImdbRating, setSelectedImdbRating] = useState<string | null>(null);
    const [yearRange, setYearRange] = useState<number[]>([1936, new Date().getFullYear()]);

    useEffect(() => {
        if (emotionsData && categoriesData && genresData) {
            setEmotions(emotionsData);
            setCategories(categoriesData);
            setGenres(genresData);
            return;
        }

        async function fetchData() {
            try {
                const [emotionsResponse, categoriesResponse, genresResponse] = await Promise.all([
                    getEmotions(),
                    getCategories(),
                    getGenres()
                ]);

                const genresData = genresResponse?.data?.data || [];
                setEmotions(emotionsResponse?.emotions || []);
                setCategories(categoriesResponse?.data || []);
                setGenres(genresData);
            } catch (error) {
                console.error("Error prefetching filter data:", error);
            }
        }

        fetchData();
    }, [emotionsData, categoriesData, genresData, isDataLoading]);

    const handleEmotionSelect = (id: number) => {
        setSelectedEmotions(prevSelected => {
            if (prevSelected.includes(id)) {
                return prevSelected.filter(emotionId => emotionId !== id);
            } else if (prevSelected.length < 3) {
                return [...prevSelected, id];
            } else {
                const newSelections = [...prevSelected.slice(1), id];
                return newSelections;
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

    const getFilterData = () => {
        return {
            emotions,
            categories,
            genres,
            selectedFilters: {
                keyword: searchKeyword,
                emotion: selectedEmotions,
                category: selectedCategory,
                genres: selectedGenres,
                imdbRating: selectedImdbRating,
                yearRange: yearRange,
            }
        };
    };

    const router = useRouter();

    const handleFilterSearch = () => {
        let searchUrl = `/search?keyword=${encodeURIComponent(searchKeyword)}`;

        if (selectedEmotions.length > 0) {
            searchUrl += `&emotions=${selectedEmotions.join(',')}`;
        }

        if (selectedCategory !== null) {
            const categoryName = categories.find((cat) => cat.id === selectedCategory)?.name;
            if (categoryName) {
                searchUrl += `&category=${encodeURIComponent(categoryName)}`;
            }
        }
        if (selectedGenres && selectedGenres.length > 0) {
            selectedGenres.forEach((genreId) => {
                const genre = genres.find(g => g.id === genreId);
                if (genre && genre.genre) {
                    searchUrl += `&genre=${encodeURIComponent(genre.genre)}`;
                }
            });
        }
        if (selectedImdbRating) {
            const match = selectedImdbRating.match(/(\d+\.\d+)/);
            if (match) {
                const imdbMin = parseFloat(match[0]);
                searchUrl += `&imdb_min=${imdbMin}`;
            }
        }

        if (yearRange) {
            searchUrl += `&year_min=${yearRange[0]}&year_max=${yearRange[1]}`;
        }

        router.push(searchUrl);
    };

    if (typeof window !== 'undefined') {
        (window as any).getFilterData = getFilterData;
    }

    return (
        <div className="w-[94%] md:w-[86%] xl:w-[70%] flex mx-auto">
            <div className="flex items-center w-full border-grey border-[1.5px] rounded-2xl h-8 md:h-10">
                <div className="flex items-center pl-4">
                    <CategoriesButton 
                        categories={categories}
                        selectedCategory={selectedCategory}
                        onCategorySelect={handleCategorySelect}
                    />
                </div>
                <div className="relative w-full">
                    <SearchInput
                        emotionsData={emotionsData!}
                        categoriesData={categoriesData!}
                        genresData={genresData!}
                        filterState={{
                            selectedEmotions,
                            selectedCategory,
                            selectedGenres,
                            selectedImdbRating,
                            yearRange,
                        }}
                        filterHandlers={{
                            handleEmotionSelect,
                            handleCategorySelect,
                            handleGenreSelect,
                            handleImdbRatingSelect,
                            handleYearRangeSelect,
                        }}
                        searchKeyword={searchKeyword}
                        onSearchKeywordChange={handleSearchInputChange}
                        onSearch={handleFilterSearch}
                    />
                </div>
            </div>
        </div>
    );
}

export default SearchBar;