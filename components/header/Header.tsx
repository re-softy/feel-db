"use client";

import Link from "next/link";
import Image from "next/image";
import { useFilterData } from "@/contexts/FilterDataContext";

import Logo from "@/public/logo.svg";

import SearchBar from "./SearchBar";
import AuthButton from "./AuthButton";
import LocaleSwitcher from "./LocaleSwitcher";
import BurgerMenu from "./BurgerMenu";

function Header({ isAuthenticated }: { isAuthenticated?: boolean }) {
  const { emotions, categories, genres } = useFilterData();

  return (
    <header className="w-full py-4 mx-auto">
      <div className="w-[96%] md:w-[94%] lg:w-[90%] mx-auto flex items-center">
        <div className="flex-shrink-0">
          <Link href="/">
            <Image src={Logo} alt="Company Logo" width={140} height={100} className="w-24 lg:w-36 3xl:w-40" />
          </Link>
        </div>
        <div className="flex-1 flex justify-center relative">
          <SearchBar 
            emotionsData={emotions} 
            categoriesData={categories} 
            genresData={genres}
          />
        </div>
        <div className="items-center gap-4 hidden md:flex">
          <LocaleSwitcher />
          <AuthButton isAuthenticated={isAuthenticated} />
        </div>
        <BurgerMenu isAuthenticated={isAuthenticated} />
      </div>
    </header>
  );
}

export default Header;