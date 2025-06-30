'use client'

import { useState } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import TuneIcon from '@mui/icons-material/Tune';
import EmotionFilter from "./EmotionFilter";

interface FilterToggleProps {
    emotionsData: any[];
    categoriesData: any[];
    genresData: any[];
    filterState: {
        selectedEmotions: number[];
        selectedCategory: number | null;
        selectedGenres: number[];
        selectedImdbRating: string | null;
        yearRange: number[];
    };
    filterHandlers: {
        handleEmotionSelect: (id: number) => void;
        handleCategorySelect: (id: number) => void;
        handleGenreSelect: (id: number) => void;
        handleImdbRatingSelect: (rating: string) => void;
        handleYearRangeSelect: (range: number[]) => void;
    };
    onSearch: () => void;
}

function FilterToggle({
    emotionsData,
    categoriesData,
    genresData,
    filterState,
    filterHandlers,
    onSearch
}: FilterToggleProps) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const hasActiveFilters = () => {
        const { selectedEmotions, selectedCategory, selectedGenres, selectedImdbRating, yearRange } = filterState;
        return (
            (selectedEmotions && selectedEmotions.length > 0) ||
            (selectedCategory !== null) ||
            (selectedGenres && selectedGenres.length > 0) ||
            (selectedImdbRating !== null) ||
            (yearRange && (yearRange[0] !== 1936 || yearRange[1] !== new Date().getFullYear()))
        );
    };

    const handleSearchAndClose = () => {
        onSearch();
        setIsFilterOpen(false);
    };

    const closeFilter = () => {
        setIsFilterOpen(false);
    };

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    return (
        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    className={`p-2 hover:bg-gray-800 rounded-lg transition-colors ${
                        hasActiveFilters() ? 'text-orange' : 'text-white'
                    }`}
                    onClick={toggleFilter}
                    aria-label="Toggle filters"
                >
                    <TuneIcon fontSize="medium" />
                </button>
            </PopoverTrigger>
            <PopoverContent align="center" className="w-[96vw] p-0 border-none rounded-lg">
                <EmotionFilter
                    emotions={emotionsData}
                    genres={genresData}
                    onClose={closeFilter}
                    filterState={filterState}
                    filterHandlers={filterHandlers}
                    onSearch={handleSearchAndClose}
                />
            </PopoverContent>
        </Popover>
    );
}

export default FilterToggle; 