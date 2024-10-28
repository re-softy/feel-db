import Link from "next/link";
import Image from "next/image";

import Logo from "@/public/logo.svg";

import SearchBar from "./SearchBar";
import AuthButton from "./AuthButton";
import LocaleSwitcher from "./LocaleSwitcher";
import BurgerMenu from "./BurgerMenu";

function Header() {
  return (
    <header className="w-full py-6">
      <div className="w-[90%] mx-auto flex items-center justify-around">
          <Link href="/">
            <Image src={Logo} alt="Company Logo" width={140} height={100} className="w-[110px] sm:w-[130px]"  />
          </Link>
          <SearchBar />
          <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <AuthButton />
          <BurgerMenu />
          </div>
      </div>
    </header>
  )
}

export default Header;