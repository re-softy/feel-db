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
        <div className="w-[40%] md:w-[65%] xl:w-[70%] flex">
            <form className="flex items-center w-full border-grey border-[1.5px] rounded-2xl h-[40px]">
                <div className="hidden items-center pl-4 md:flex">
                    <DropdownMenu onOpenChange={toggleDropdown}>
                        <DropdownMenuTrigger className="text-white flex items-center justify-around cursor-pointer w-[106px] h-[40px] outline-none border-r-[1px] border-grey">
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
                        className="w-full border-none outline-none text-white text-sm pl-2 bg-black pr-10" />
                    <SearchIcon className="absolute right-[10px] top-[50%] translate-y-[-50%] text-white cursor-pointer" />
                </div>
            </form>
        </div>
    )
}

export default SearchBar;

