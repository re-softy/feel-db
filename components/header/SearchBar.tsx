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

    const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedImdbRating, setSelectedImdbRating] = useState<string | null>(null);
    const [yearRange, setYearRange] = useState<number[]>([1900, new Date().getFullYear()]);

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

                setEmotions(emotionsResponse?.emotions || []);
                setCategories(categoriesResponse?.data || []);
                setGenres(genresResponse?.data || []);
            } catch (error) {
                console.error("Error prefetching filter data:", error);
            }
        }

        fetchData();
    }, [emotionsData, categoriesData, genresData, isDataLoading]);

    const handleEmotionSelect = (id: number) => {
        setSelectedEmotion(selectedEmotion === id ? null : id);
    };

    const handleCategorySelect = (id: number) => {
        setSelectedCategory(selectedCategory === id ? null : id);
    };

    const handleGenreSelect = (id: number) => {
        setSelectedGenres(
            selectedGenres.includes(id)
                ? selectedGenres.filter(genreId => genreId !== id)
                : [...selectedGenres, id]
        );
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

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const getFilterData = () => {
        return {
            emotions,
            categories,
            genres,
            selectedFilters: {
                keyword: searchKeyword,
                emotion: selectedEmotion,
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

        if (selectedEmotion !== null) {
            searchUrl += `&emotions=${selectedEmotion}`;
        }

        if (selectedCategory !== null) {
            const categoryName = categories.find((cat) => cat.id === selectedCategory)?.name;
            if (categoryName) {
                searchUrl += `&category=${encodeURIComponent(categoryName)}`;
            }
        }

        if (selectedGenres.length > 0) {
            selectedGenres.forEach((genreId) => {
                searchUrl += `&genres=${genreId}`;
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
            <form className="flex items-center w-full border-grey border-[1.5px] rounded-2xl h-[40px]"
                onSubmit={handleSearchSubmit}
            >
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
                            selectedEmotion,
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
            </form>
        </div>
    );
}

export default SearchBar;