'use client'

import { useState, useEffect } from 'react';
import { getEmotions, getCategories, getGenres } from "@/lib/api";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VideocamIcon from '@mui/icons-material/Videocam';
import TvIcon from '@mui/icons-material/Tv';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { SearchBarProps } from "@/types/types";

function SearchBar({
    emotionsData,
    categoriesData,
    genresData,
    isDataLoading
}: SearchBarProps) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [emotions, setEmotions] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [genres, setGenres] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (emotionsData && categoriesData && genresData) {
            setEmotions(emotionsData);
            setCategories(categoriesData);
            setGenres(genresData);
            setLoading(isDataLoading || false);
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
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [emotionsData, categoriesData, genresData, isDataLoading]);

    const toggleDropdown = (open: boolean) => {
        setIsDropdownOpen(open);
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const getFilterData = () => {
        return {
            emotions,
            categories,
            genres,
            loading
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
                    <DropdownMenu onOpenChange={toggleDropdown}>
                        <DropdownMenuTrigger className="text-white flex items-center justify-around cursor-pointer w-[130px] h-[40px] outline-none border-r-[1px] border-grey">
                            {selectedCategory || 'Category'}
                            {isDropdownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => handleCategorySelect('Movies')}>
                                <VideocamIcon className="mr-2" /> Movies
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCategorySelect('Series')}>
                                <TvIcon className="mr-2" /> Series
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCategorySelect('Animation')}>
                                <LocalMoviesIcon className="mr-2" /> Animation
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="relative w-full">
                    <input
                        type='text'
                        className="w-full border-none outline-none text-white text-sm pl-2 bg-black pr-10 z-30"
                    />
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