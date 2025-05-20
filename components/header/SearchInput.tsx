import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import SearchIcon from '@mui/icons-material/Search';
import EmotionFilter from "./EmotionFilter";
import { SearchInputProps } from "@/types/types";
import { useEffect, useRef, useState } from "react";

function SearchInput({
    emotionsData,
    genresData,
    filterState,
    filterHandlers,
    searchKeyword,
    onSearchKeywordChange,
    onSearch
}: SearchInputProps) {
    const [dropdownState, setDropdownState] = useState(false);
    const searchInput = useRef<HTMLInputElement>(null);

    const openEmotionFilter = () => {
        setDropdownState(true);
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSearch();
            closeEmotionFilter();
        }
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
        <>
            <Popover open={dropdownState}>
                <PopoverTrigger asChild>
                    <input
                        type='text'
                        className="w-full border-none outline-none text-white text-sm pl-2 bg-black pr-10 z-30"
                        ref={searchInput}
                        value={searchKeyword}
                        onChange={onSearchKeywordChange}
                        onKeyDown={handleKeyDown}
                        onClick={() => setDropdownState(prev => !prev)}
                    />
                </PopoverTrigger>
                <PopoverContent align="center" className="w-[96vw] p-0 border-none rounded-lg">
                    <EmotionFilter
                        emotions={emotionsData}
                        genres={genresData}
                        onClose={closeEmotionFilter}
                        filterState={filterState}
                        filterHandlers={filterHandlers}
                        onSearch={onSearch}
                    />
                </PopoverContent>
            </Popover>
            <button
                type="submit"
                className="absolute right-[10px] top-[50%] translate-y-[-50%] text-white cursor-pointer bg-transparent border-none p-0"
                onClick={onSearch}
            >
                <SearchIcon />
            </button>
        </>
    )
}

export default SearchInput;