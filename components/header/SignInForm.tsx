"use client" 
import { useState } from "react";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function SignInForm({ onResetPassword }: { onResetPassword: () => void }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
      <form className="my-2 flex flex-col">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input id="email" autoComplete="off" placeholder="your-email@example.com"
                   className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none"/>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="block">Password</label>
            <div className="relative">
              <input id="password" type={isPasswordVisible ? "text" : "password"} placeholder="********"
                     className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none"/>
              <button
                  type="button"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {isPasswordVisible ? <VisibilityOffIcon fontSize="small" className="text-gray-400"/> :
                    <VisibilityIcon fontSize="small" className="text-gray-400"/>}
              </button>
            </div>
            <span className="text-sm pl-1 text-[#CBCBCB]">4 or more characters, at least one upper case</span>
          </div>
          <div>
            <span onClick={onResetPassword} className="text-orange cursor-pointer text-sm">Forgot Your Password?</span>
          </div>
        </div>
        <button type="submit" className='bg-orange py-2 px-10 rounded-full tracking-wide self-center mt-4'>Sign In</button>
      </form>
  );
}

export default SignInForm;