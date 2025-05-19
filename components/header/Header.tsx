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

function Header() {
  const [emotionsData, setEmotionsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [genresData, setGenresData] = useState([]);

  useEffect(() => {
    async function fetchFilterData() {
      try {
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
      }
    }

    fetchFilterData();
  }, []);

  return (
    <header className="w-full py-4 mx-auto">
      <div className="w-[96%] mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image src={Logo} alt="Company Logo" width={140} height={100} className="w-[110px] sm:w-[130px]" />
          </Link>
        </div>
        <div className="flex-1 flex justify-center relative">
          <SearchBar emotionsData={emotionsData} categoriesData={categoriesData} genresData={genresData}  />
        </div>
        <div className="items-center gap-4 hidden md:flex">
          <LocaleSwitcher />
          <AuthButton />
        </div>
        <BurgerMenu />
      </div>
    </header>
  );
}

export default Header;