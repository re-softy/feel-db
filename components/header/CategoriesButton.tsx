import { useState } from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VideocamIcon from '@mui/icons-material/Videocam';
import TvIcon from '@mui/icons-material/Tv';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { Category, CategoriesButtonProps } from "@/types/types";

function CategoriesButton({
    categories = [] as Category[],
    selectedCategory = null,
    onCategorySelect
}: CategoriesButtonProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = (open: boolean) => {
        setIsDropdownOpen(open);
    };

    const handleCategorySelect = (categoryId: number) => {
        onCategorySelect(categoryId);
        setIsDropdownOpen(false);
    };

    const selectedCategoryName = selectedCategory !== null
        ? categories.find(cat => cat.id === selectedCategory)?.name
        : null;

    const getCategoryIcon = (categoryName: string) => {
        const iconMap: Record<string, JSX.Element> = {
            'Movies': <VideocamIcon className="mr-2" />,
            'TVSeries': <TvIcon className="mr-2" />,
            'TVEpisode': <LocalMoviesIcon className="mr-2" />
        };

        return iconMap[categoryName] || <VideocamIcon className="mr-2" />;
    };

    return (
        <DropdownMenu onOpenChange={toggleDropdown}>
            <DropdownMenuTrigger className="text-white flex items-center justify-around cursor-pointer h-[40px] outline-none border-r-[1px] border-grey">
                <div className="md:hidden flex items-center justify-center w-[40px]">
                    {isDropdownOpen ? <KeyboardArrowUpIcon className="self-center mr-2" /> : <KeyboardArrowDownIcon className="self-center mr-2" />}
                </div>
                <div className="hidden md:flex items-center justify-between w-[130px] px-2">
                    {selectedCategoryName || 'Category'}
                    {isDropdownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {categories.map(category => (
                    <DropdownMenuItem
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                    >
                        {getCategoryIcon(category.name)} {category.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>)
}

export default CategoriesButton;