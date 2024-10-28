import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import FooterSocials from "./FooterSocials";

function Footer() {
  return (
    <footer className="w-full py-4 gap-6 border-t-2 border-grey">
      <div className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto flex flex-col mt-2 items-center justify-between">
        <Image src={Logo} alt="logo" width={120} height={130} className="w-36 self-start md:ml-10" />
        <FooterSocials />
      </div>
      <div className="flex flex-col items-center justify-center my-10 gap-2 md:flex-row md:gap-10">
        <div className="flex items-center gap-4 md:gap-8">
        <Link href={'#'} className="text-sm md:text-md lg:text-lg font-light">Terms and Conditions</Link>
        <Link href={'#'} className="text-sm md:text-md lg:text-lg font-light">Privacy Policy</Link>
        </div>
        <span className="hidden md:block">&#8226;</span>
        <div className="flex items-center gap-4 md:gap-8">
        <p className="text-xs md:text-md lg:text-lg font-light">All rights reserved</p>
        <p className="text-xs md:text-md lg:text-lg font-light">Website contains 18+ content</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
