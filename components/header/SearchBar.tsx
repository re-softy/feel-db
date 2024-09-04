'use client'

import React, { useState } from 'react';

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

function SearchBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="w-full flex items-center border-gray-400 border-[1.5px] rounded-[12px]">
            <form className="flex items-center w-full">
                <div className="flex items-center">
                    <DropdownMenu onOpenChange={toggleDropdown}>
                        <DropdownMenuTrigger className="bg-[#cc6640] text-white flex items-center justify-center gap-[4px] cursor-pointer w-[106px] rounded-l-[12px] h-[35px] px-2">
                            Category
                            {isDropdownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem><SearchIcon /> All</DropdownMenuItem>
                            <DropdownMenuItem><VideocamIcon /> Movies</DropdownMenuItem>
                            <DropdownMenuItem><TvIcon /> Series</DropdownMenuItem>
                            <DropdownMenuItem><LocalMoviesIcon /> Animation</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="relative w-full">
                    <input 
                        className="w-full border-none outline-none text-white text-sm rounded-r-[12px] rounded-l-[0px] pl-[12px] pr-[35px] h-[35px] bg-black" 
                    />
                    <SearchIcon className="absolute right-[10px] top-[50%] translate-y-[-50%] text-white cursor-pointer" />
                </div>
            </form>
        </div>
    )
}

export default SearchBar;
