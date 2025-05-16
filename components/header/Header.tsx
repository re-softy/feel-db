"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getEmotions, getCategories, getGenres } from "@/lib/api";

import Logo from "@/public/logo.svg";

import SearchBar from "./SearchBar";
import AuthButton from "./AuthButton";
import LocaleSwitcher from "./LocaleSwitcher";
import BurgerMenu from "./BurgerMenu";
import EmotionFilter from "./EmotionFilter";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const [showEmotionFilter, setShowEmotionFilter] = useState(false);
  const [emotionsData, setEmotionsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [genresData, setGenresData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFilterData() {
      try {
        setIsLoading(true);
        const [emotionsResponse, categoriesResponse, genresResponse] = await Promise.all([
          getEmotions(),
          getCategories(),
          getGenres()
        ]);

        setEmotionsData(emotionsResponse?.emotions || []);
        setCategoriesData(categoriesResponse?.data || []);
        setGenresData(genresResponse?.data || []);
      } catch (error) {
        console.error("Error prefetching filter data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFilterData();
  }, []);

  const openEmotionFilter = () => {
    setShowEmotionFilter(true);
  };

  const closeEmotionFilter = () => {
    setShowEmotionFilter(false);
  };

  return (
    <header className="w-full py-4">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image src={Logo} alt="Company Logo" width={140} height={100} className="w-[110px] sm:w-[130px]" />
          </Link>
        </div>
        <div className="flex-1 flex justify-center relative">
          <DropdownMenu open={showEmotionFilter} onOpenChange={setShowEmotionFilter}>
            <DropdownMenuTrigger asChild>
              <div className="w-full opacity-0 absolute inset-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[92vw] p-0 border-none rounded-lg">
              <EmotionFilter
                emotions={emotionsData}
                categories={categoriesData}
                genres={genresData}
                isLoading={isLoading}
                onClose={closeEmotionFilter}
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <SearchBar onSearchFocus={openEmotionFilter} />
        </div>
        <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <AuthButton />
          <BurgerMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;