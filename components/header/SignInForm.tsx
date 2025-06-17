'use client';

import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';

import { toast } from "sonner";

import { SignInUser } from '@/lib/actions/auth';

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import type { SignInFormProps } from "@/types/types";

function SignInForm({ onForgotPassword }: SignInFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [state, formAction] = useFormState(SignInUser, { error: null });

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-y-2 mb-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="yourmail@mail.com"
          className="border border-grey rounded-md focus:outline-none bg-black h-9 p-2 text-sm"
          required
        />
      </div>

      <div className="flex flex-col gap-y-2 mb-2">
        <label htmlFor="password">Password</label>
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            name="password"
            placeholder="********"
            className="w-full border border-grey rounded-md focus:outline-none bg-black h-9 p-2 text-sm"
            required
            minLength={8}
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
          >
            {isPasswordVisible ? (
              <VisibilityOffIcon fontSize="small" className="text-gray-400" />
            ) : (
              <VisibilityIcon fontSize="small" className="text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <p
        onClick={onForgotPassword}
        className="text-sm mt-2 cursor-pointer text-orange"
      >
        Forgot Your Password?
      </p>

      <button
        type="submit"
        className="bg-orange py-2 px-10 rounded-full uppercase mt-4 mx-auto block"
      >
        Sign In
      </button>
    </form>
  );
}

export default SignInForm;