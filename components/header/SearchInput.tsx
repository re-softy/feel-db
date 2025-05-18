import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import EmotionFilter from "./EmotionFilter";
import { SearchInputProps } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/navigation';

function SearchInput({ 
    emotionsData, 
    categoriesData, 
    genresData,
    filterState,
    filterHandlers, 
    searchKeyword,
    onSearchKeywordChange,
    onSearchSubmit,
    isSearching
}: SearchInputProps) {
    const [dropdownState, setDropdownState] = useState(false);
    const searchInput = useRef<HTMLInputElement>(null);
    const router = useRouter();
    
    const openEmotionFilter = () => {
        setDropdownState(true);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleFilterSearch();
        }
    };

    const handleFilterSearch = () => {
        closeEmotionFilter();
        
        // Build search URL with all filters
        let searchUrl = `/search?keyword=${encodeURIComponent(searchKeyword)}`;

        // Add emotion filter if selected
        const { selectedEmotion, selectedCategory, selectedGenres, selectedImdbRating } = filterState;
        
        if (selectedEmotion !== null) {
            searchUrl += `&emotions=${selectedEmotion}`;
        }
        
        // Add category filter if selected
        if (selectedCategory !== null) {
            const categoryName = categoriesData.find((cat: any) => cat.id === selectedCategory)?.name;
            if (categoryName) {
                searchUrl += `&category=${encodeURIComponent(categoryName)}`;
            }
        }
        
        // Add genre filters if selected
        if (selectedGenres.length > 0) {
            selectedGenres.forEach((genreId: number) => {
                searchUrl += `&genres=${genreId}`;
            });
        }
        
        // Add IMDb rating filter if selected
        if (selectedImdbRating) {
            const match = selectedImdbRating.match(/(\d+\.\d+)/);
            if (match) {
                const imdbMin = parseFloat(match[0]);
                searchUrl += `&imdb_min=${imdbMin}`;
            }
        }
        
        // Navigate to search page with all filters
        router.push(searchUrl);
    };

    const closeEmotionFilter = () => {
        setDropdownState(false);
    }

    useEffect(() => {
        if (dropdownState) {
            const focusHandler = requestAnimationFrame(() => {
                searchInput.current?.focus();
            });

            return () => cancelAnimationFrame(focusHandler);
        }
    }, [dropdownState]);

    return (
        <Popover open={dropdownState}>
            <PopoverTrigger asChild>
                <input
                    type='text'
                    className="w-full border-none outline-none text-white text-sm pl-2 bg-black pr-10 z-30"
                    ref={searchInput}
                    value={searchKeyword}
                    onChange={onSearchKeywordChange}
                    onKeyDown={handleKeyDown}
                    onClick={() => openEmotionFilter()}
                />
            </PopoverTrigger>
            <PopoverContent align="center" className="w-[92vw] p-0 border-none rounded-lg">
                <EmotionFilter
                    emotions={emotionsData}
                    categories={categoriesData}
                    genres={genresData}
                    // isLoading={emotionsData.length > 0 && categoriesData.length > 0 && genresData.length > 0}
                    onClose={closeEmotionFilter}
                    filterState={filterState}
                    filterHandlers={filterHandlers}
                    onSearch={handleFilterSearch}
                />
            </PopoverContent>
        </Popover>
    )
}

export default SearchInput;