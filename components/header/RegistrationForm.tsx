"use client"

import { useFormState } from "react-dom";
import { useEffect, useState } from "react";

import { toast } from "sonner";

import Link from "next/link";

import { CreateUser } from "@/lib/actions/auth";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import type { RegistrationFormProps } from "@/types/types";

const initialState = {
  ok: false,
  message: '',
  data: undefined,
  errors: undefined
};

function RegistrationForm({ onRegistrationSuccess }: RegistrationFormProps) {
  const [state, formAction] = useFormState(CreateUser, initialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);

  useEffect(() => {
    if (state.ok) {
      toast.success("Registration successful! Please sign in.");
      const timer = setTimeout(() => {
        onRegistrationSuccess?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.ok, onRegistrationSuccess]);

  return (
    <div className="">
      <form action={formAction}>
        <div className="flex flex-col gap-y-2 mb-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            id="name"
            name="name"
            className="border border-grey rounded-md focus:outline-none bg-black h-9 p-2 outline-none text-sm"
            required
          />
        </div>
        
        <div className="flex flex-col gap-y-2 mb-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="yourmail@mail.com"
            id="email"
            name="email"
            className="border border-grey rounded-md focus:outline-none bg-black h-9 p-2 outline-none text-sm"
            required
          />
        </div>

        <div className="flex flex-col gap-y-2 mb-2">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="********"
              id="password"
              name="password"
              className="w-full border border-grey rounded-md focus:outline-none bg-black h-9 p-2 outline-none text-sm"
              required
              minLength={8}
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
        </div>

        <div className="flex flex-col gap-y-2 mb-2">
          <label htmlFor="password_confirmation">Confirm Password</label>
          <div className="relative">
            <input
              type={isRepeatPasswordVisible ? "text" : "password"}
              placeholder="********"
              id="password_confirmation"
              name="password_confirmation"
              className="w-full border border-grey rounded-md focus:outline-none bg-black h-9 p-2 outline-none text-sm"
              required
              minLength={8}
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

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="agreeToPrivacyPolicy"
            name="agreeToPrivacyPolicy"
            className="form-checkbox"
          />
          <span className="text-sm">
            I&apos;ve read and accept the <Link href="/privacy-policy" className="text-orange cursor-pointer underline">Privacy Policy</Link>
          </span>
        </div>
        <button type="submit" className="bg-orange py-2 px-10 rounded-full uppercase mt-4 mx-auto block">
          Create
        </button>
        {state.message && (
          <p className={`text-sm mb-4 ${state.ok ? 'text-green-500' : 'text-red-500'}`}>
            {state.message}
          </p>
        )}
      </form>
    </div>
  );
}

export default RegistrationForm;