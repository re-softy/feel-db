'use client'

import { useState, useEffect } from 'react';
import { getEmotions, getCategories, getGenres } from "@/lib/api";

import SearchIcon from '@mui/icons-material/Search';
import { SearchBarProps } from "@/types/types";
import CategoriesButton from './CategoriesButton';
import SearchInput from './SearchInput';

function SearchBar({
    emotionsData,
    categoriesData,
    genresData,
    isDataLoading
}: SearchBarProps) {
    const [emotions, setEmotions] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [genres, setGenres] = useState<any[]>([]);

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

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const getFilterData = () => {
        return {
            emotions,
            categories,
            genres
        };
    };

    if (typeof window !== 'undefined') {
        (window as any).getFilterData = getFilterData;
    }

    return (
        <div className="w-[40%] md:w-[65%] xl:w-[70%] flex">
            <form className="flex items-center w-full border-grey border-[1.5px] rounded-2xl h-[40px]"
                onSubmit={handleSearchSubmit}
            >
                <div className="hidden items-center pl-4 md:flex">
                    <CategoriesButton />
                </div>
                <div className="relative w-full">
                    <SearchInput emotionsData={emotionsData!} categoriesData={categoriesData!} genresData={genresData!} />
                    <>
                        <button
                            type="submit"
                            className="absolute right-[10px] top-[50%] translate-y-[-50%] text-white cursor-pointer bg-transparent border-none p-0"
                        >
                            <SearchIcon />
                        </button>
                    </>
                </div>
            </form>
        </div>
    );
}

export default SearchBar;