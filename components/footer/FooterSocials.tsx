"use client"

import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LanguageIcon from '@mui/icons-material/Language';

import Link from 'next/link';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function FooterSocials() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div className='w-[90%] flex flex-col gap-y-6 md:gap-y-0 md:flex-row items-start justify-between mt-8'>
      <div className='flex flex-col gap-3'>
        <p className='uppercase text-md md:text-lg lg:text-xl'>Categories</p>
        <ul>
          <li className='text-md md:text-lg lg:text-xl mb-1'>Movies</li>
          <li className='text-md md:text-lg lg:text-xl mb-1'>TV Shows</li>
          <li className='text-md md:text-lg lg:text-xl mb-1'>Animation</li>
        </ul>
      </div>
      <div className='flex flex-col gap-3'>
        <p className='uppercase text-md md:text-lg lg:text-xl'>Sign Up</p>
        <div className="relative w-full">
          <input placeholder="Enter Your Email"
            className="w-[100%] border-[1px] border-[#E0E0E0] outline-none text-[#E0E0E0] text-sm h-[44px] bg-black p-4"
          />
          <ArrowForwardIcon className="absolute right-[10px] top-[50%] translate-y-[-50%] text-white cursor-pointer" />
        </div>
      </div>
      <div className='flex flex-col items-start gap-4'>
        <p className='uppercase text-md md:text-lg lg:text-xl'>Social Media</p>
        <div className='flex w-full gap-4'>
          <Link href={'#'}>
            <FacebookIcon fontSize='large' />
          </Link>
          <Link href={'#'}>
            <LinkedInIcon fontSize='large' />
          </Link>
          <Link href={'#'}>
            <XIcon fontSize='large' />
          </Link>
          <Link href={'#'}>
            <InstagramIcon fontSize='large' />
          </Link>
        </div>
        <div className="flex mt-2">
          <DropdownMenu onOpenChange={toggleDropdown}>
            <DropdownMenuTrigger className="text-white flex items-center uppercase gap-2 border-[#E0E0E0] border-[1px] p-2 rounded-sm text-sm md:text-md lg:text-lg">
              <LanguageIcon fontSize='small'/>
              english
              {isDropdownOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className='text-sm md:text-md lg:text-lg'>GEORGIAN</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default FooterSocials;