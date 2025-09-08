import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import SearchIcon from '@mui/icons-material/Search';
import EmotionFilter from "./EmotionFilter";
import { SearchInputProps, MediaItem } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { searchMedia } from "@/lib/api";
import { getTopEmotions } from "@/utils/emotionUtils";
import { getEmojiForEmotion } from "@/utils/emoji";

function SearchInput({
    emotionsData,
    categoriesData,
    genresData,
    filterState,
    filterHandlers,
    searchKeyword,
    onSearchKeywordChange,
    onSearch
}: SearchInputProps) {
    const [dropdownState, setDropdownState] = useState(false);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<MediaItem[]>([]);
    const searchInput = useRef<HTMLInputElement>(null);

    const hasActiveFilters = () => {
        const { selectedEmotions, selectedCategory, selectedGenres, selectedImdbRating, yearRange } = filterState;
        return (
            (selectedEmotions && selectedEmotions.length > 0) ||
            (selectedCategory !== null) ||
            (selectedGenres && selectedGenres.length > 0) ||
            (selectedImdbRating !== null) ||
            (yearRange && (yearRange[0] !== 1900 || yearRange[1] !== new Date().getFullYear()))
        );
    };

    const handleSearchAndClose = () => {
        onSearch();
        setDropdownState(false);
    };

    const handleOpenChange = (open: boolean) => {
        if (!open && searchInput.current && searchInput.current.contains(document.activeElement)) {
            return;
        }
        setDropdownState(open);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearchAndClose();
        }
    };

    const closeEmotionFilter = () => {
        setDropdownState(false);
    }

    useEffect(() => {
        if (searchInput.current && dropdownState) {
            const focusHandler = requestAnimationFrame(() => {
                searchInput.current?.focus();
            });

            return () => cancelAnimationFrame(focusHandler);
        }
    }, [dropdownState]);

    useEffect(() => {
        if (searchKeyword && searchKeyword.trim().length > 0 && !dropdownState) {
            setDropdownState(true);
        }
    }, [searchKeyword, dropdownState]);

    useEffect(() => {
        const controller = new AbortController();

        const fetchSuggestions = async () => {
            const query = searchKeyword?.trim() || "";
            if (query.length < 2) {
                setSuggestions([]);
                return;
            }

            try {
                setIsLoadingSuggestions(true);

                const currentYear = new Date().getFullYear();
                const { selectedEmotions, selectedCategory, selectedGenres, selectedImdbRating, yearRange } = filterState;

                const categoryName = selectedCategory !== null
                    ? (Array.isArray(categoriesData) ? categoriesData.find((c: any) => c.id === selectedCategory)?.name : undefined)
                    : undefined;

                const params: any = {
                    keyword: query,
                    genres: selectedGenres || [],
                    emotions: selectedEmotions || [],
                    imdb_min: selectedImdbRating ? (parseFloat((selectedImdbRating.match(/(\d+\.\d+)/) || [])[0] || '0') || null) : null,
                    year_min: yearRange?.[0] !== undefined ? yearRange[0] : null,
                    year_max: yearRange?.[1] !== undefined ? yearRange[1] : currentYear,
                    page: 1,
                    per_page: 5,
                };

                if (categoryName) {
                    params.category = categoryName;
                }

                const res = await searchMedia(params);

                const itemsArray = Array.isArray(res.data) ? res.data : (res.data?.data || []);
                setSuggestions(itemsArray.slice(0, 5));
            } catch (err) {
                setSuggestions([]);
            } finally {
                setIsLoadingSuggestions(false);
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300);
        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [searchKeyword, filterState]);

    return (
        <>
            <Popover open={dropdownState} onOpenChange={handleOpenChange}>
                <PopoverTrigger asChild>
                    <input
                        type='text'
                        className="w-full border-none outline-none text-white text-sm pl-2 bg-black pr-10 z-30"
                        ref={searchInput}
                        value={searchKeyword}
                        onChange={(e) => {
                            onSearchKeywordChange(e);
                            if (!dropdownState) setDropdownState(true);
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </PopoverTrigger>
                <PopoverContent align="center" className="w-[96vw] p-0 border-none rounded-lg mt-2 mr-4">
                    {(searchKeyword?.trim().length ?? 0) > 0 && (

                        <div className="mx-auto max-h-72 overflow-auto bg-black rounded-t-lg">
                            <div className="py-2">
                                {isLoadingSuggestions ? (
                                    <div className="flex justify-center items-center px-4 py-2 text-sm text-gray-400">Searching…</div>
                                ) : suggestions.length > 0 ? (
                                    suggestions.map((item) => {
                                        const topEmotions = getTopEmotions(item, 3);
                                        return (
                                            <div className="max-w-[600px] xl:max-w-[800px] 3xl:max-w-[1200px] mx-auto" key={item.id}>
                                                <Link
                                                    key={item.id}
                                                    href={`/media/${item.id}`}
                                                    className="flex items-center gap-3 px-4 py-2 hover:bg-white/5"
                                                    onClick={() => setDropdownState(false)}
                                                >
                                                    <img
                                                        src={item.poster_path || "/logo.svg"}
                                                        alt={item.title_en}
                                                        className="w-8 h-12 object-cover rounded"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = "/logo.svg";
                                                        }}
                                                    />
                                                    <div className="flex flex-col min-w-0 flex-1">
                                                        <span className="text-sm text-white truncate">{item.title_en}</span>
                                                        <span className="text-xs text-gray-400">{item.release_year}{item.imdb_rank ? ` • IMDb ${item.imdb_rank}` : ""}</span>
                                                        {topEmotions.length > 0 && (
                                                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                                {topEmotions.map((emotion) => (
                                                                    <span key={emotion.id} className="text-xs text-gray-300 flex items-center gap-1">
                                                                        <span>{getEmojiForEmotion(emotion.name)}</span>
                                                                        <span className="text-gray-400">{emotion.name}</span>
                                                                        <span className="text-gray-500">({emotion.percentage}%)</span>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="flex justify-center items-center px-4 py-2 text-sm text-gray-400">No suggestions</div>
                                )}
                            </div>
                        </div>
                    )}
                    <EmotionFilter
                        emotions={emotionsData}
                        genres={genresData}
                        onClose={closeEmotionFilter}
                        filterState={filterState}
                        filterHandlers={filterHandlers}
                        onSearch={handleSearchAndClose}
                    />
                </PopoverContent>
            </Popover>
            <button
                type="submit"
                className="absolute right-[10px] top-[50%] translate-y-[-50%] text-white cursor-pointer bg-transparent border-none p-0"
                onClick={handleSearchAndClose}
            >
                <SearchIcon />
            </button>
        </>
    )
}

export default SearchInput;