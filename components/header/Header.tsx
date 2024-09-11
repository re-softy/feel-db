import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";
import SearchBar from "./SearchBar";
import AuthButton from "./AuthButton";
import LocaleSwitcher from "./LocaleSwitcher";

function Header() {
  return (
    <header className="w-full py-6">
      <div className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto flex items-center gap-10">
          <Link href="/">
            <Image src={Logo} alt="Company Logo" width={120} height={100} className="w-[146px]" />
          </Link>
          <SearchBar />
          <div className="flex items-center gap-4">
          <LocaleSwitcher />
          <AuthButton />
          </div>
      </div>
    </header>
  )
}

export default Header;