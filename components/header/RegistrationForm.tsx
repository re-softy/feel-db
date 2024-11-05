"use client";
import { useState } from "react";
import Link from "next/link";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function RegistrationForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);

  return (
    <form className="my-1">
      <div className="flex flex-col gap-1 2xl:gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="block">Name</label>
          <input id="name" placeholder="Your name" className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="number" className="block">Phone Number</label>
          <input type="number" id="number" placeholder="+995" className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="block">Email</label>
          <input id="email" type="email" placeholder="youremail@mail.com" className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="block">Password</label>
          <div className="relative">
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="********"
              className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {isPasswordVisible ? (
                <VisibilityOffIcon fontSize="small" className="text-gray-400" />
              ) : (
                <VisibilityIcon fontSize="small" className="text-gray-400" />
              )}
            </button>
          </div>
          <span className="text-sm pl-1 text-[#CBCBCB]">4 or more characters, at least one upper case</span>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="repeat-password" className="block">Repeat Password</label>
          <div className="relative">
            <input
              id="repeat-password"
              type={isRepeatPasswordVisible ? "text" : "password"}
              placeholder="********"
              className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setIsRepeatPasswordVisible(!isRepeatPasswordVisible)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            >
              {isRepeatPasswordVisible ? (
                <VisibilityOffIcon fontSize="small" className="text-gray-400" />
              ) : (
                <VisibilityIcon fontSize="small" className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <input type="checkbox" id="scales" name="scales" />
        <span className="text-sm">I’ve read and accept the <Link href={'#'} className="text-orange cursor-pointer underline">Privacy Policy</Link></span>
      </div>
    </form>
  );
}

export default RegistrationForm;
