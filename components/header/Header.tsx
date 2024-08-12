import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import SearchBar from "./SearchBar";
import AuthButton from "./AuthButton";
import LocaleSwitcher from "./LocaleSwitcher";

function Header() {
  return (
    <header className="w-full px-6 py-3">
      <div className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] 2xl:w-[65%] mx-auto flex items-center justify-between gap-4">
       
          <Link href="/">
            <Image src={Logo} alt="Company Logo" width={120} height={100} className="w-[120px]" />
          </Link>
          <SearchBar />
          <LocaleSwitcher />
          <AuthButton />
        
      </div>
    </header>
  )
}

export default Header;