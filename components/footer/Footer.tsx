import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import FooterSocials from "./FooterSocials";

function Footer() {
  return (
    <footer className="w-full px-6 py-4 gap-6 border-t-2 border-gray-700">
      <div className="w-[80%] flex flex-col mx-auto mt-2 items-start justify-between">
      <div className="w-full flex items-center gap-20">
        <div className="flex flex-col gap-10">
          <Image src={Logo} alt="logo" width={120} height={130} className="w-52"/>
          <div>
            <ul className="flex flex-col gap-y-4">
              <li>
                <Link href="#">
                  <p className="text-white uppercase text-lg">movies</p>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <p className="text-white uppercase text-lg">series</p>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <p className="text-white uppercase text-lgn">animation</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          <div>
            <h1 className="font-bold tracking-wider text-2xl">Top Movies of the day</h1>
          </div>
          {Array(5).fill("").map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <p className="text-lg">&#x2022; The Gray Man sfhksjhkjkjhkjsdhkj</p>
              <span className="text-gray-400 text-xl">ნაცრისფერი კაცი</span>
            </div>
          ))}
        </div>
      </div>
      <FooterSocials />
      </div>
      <div className="flex items-center justify-center gap-6 mt-10">
          <p className="text-sm">All rights reserved</p>
          <p className="text-sm">საიტი შეიცავს 18+ კონტენტს</p>
      </div>
    </footer>
  );
}

export default Footer;
