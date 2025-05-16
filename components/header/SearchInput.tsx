import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import EmotionFilter from "./EmotionFilter";
import { SearchInputProps } from "@/types/types";
import { useEffect, useRef, useState } from "react";



function SearchInput({emotionsData, categoriesData, genresData}: SearchInputProps) {
    const [dropdownState, setDropdownState] = useState(false);
    const searchInput = useRef<HTMLInputElement>(null);

    const openEmotionFilter = () => {
        setDropdownState(true);
    }

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
                            onClick={() => openEmotionFilter()}
                        />
            </PopoverTrigger>
            <PopoverContent align="center" className="w-[92vw] p-0 border-none rounded-lg">
              <EmotionFilter
                emotions={emotionsData}
                categories={categoriesData}
                genres={genresData}
                isLoading={emotionsData.length > 0 && categoriesData.length > 0 && genresData.length > 0}
                onClose={closeEmotionFilter}
              />
            </PopoverContent>
          </Popover>
    )
}

export default SearchInput;