import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import FooterSocials from "./FooterSocials";

function Footer() {
  return (
    <footer className="w-full px-6 py-4 gap-6 border-t-2 border-gray-700">
      <div className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto flex flex-col mt-2 items-start justify-between">
        <Image src={Logo} alt="logo" width={120} height={130} className="w-36" />
        <FooterSocials />
      </div>
      <div className="flex items-center justify-center gap-6 my-10">
        <p className="text-sm">All rights reserved</p>
        <p className="text-sm">საიტი შეიცავს 18+ კონტენტს</p>
      </div>
    </footer>
  );
}

export default Footer;
