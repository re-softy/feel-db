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
import { useState } from "react";

function CategoriesButton() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const toggleDropdown = (open: boolean) => {
        setIsDropdownOpen(open);
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };

    return (<DropdownMenu onOpenChange={toggleDropdown}>
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
    </DropdownMenu>)
}

export default CategoriesButton;