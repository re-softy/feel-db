"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SignUp } from "@/lib/action";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    repeatPassword: "",
    agreeToPrivacyPolicy: false,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Test");

    if (formData.password !== formData.repeatPassword) {
      alert("Passwords do not match!");
      return;
    }

      const SignUpStatus = await SignUp(formData);

      if (SignUpStatus.ok) {
        alert("Registration successful!");
      } else {
       if(SignUpStatus.message){
        setErrorMessage(SignUpStatus.message)
        }
        else {  
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
      }
  };

  return (
    <form onSubmit={handleSubmit} className="my-1">
      <div className="flex flex-col gap-1 2xl:gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="block">Name</label>
          <input
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your name"
            className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none visited:bg-black"
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber" className="block">Phone Number</label>
          <input
              autoComplete="off"
            type="number"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="+995"
            className="w-full bg-black text-white p-2 border border-grey rounded-md focus:bg-black focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="block">Email</label>
          <input
              autoComplete="off"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="youremail@mail.com"
            className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="block">Password</label>
          <div className="relative">
            <input
                autoComplete="off"
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              value={formData.password}
              onChange={handleInputChange}
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
          <label htmlFor="repeatPassword" className="block">Repeat Password</label>
          <div className="relative">
            <input
              id="repeatPassword"
              type={isRepeatPasswordVisible ? "text" : "password"}
              value={formData.repeatPassword}
              onChange={handleInputChange}
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
        <input
          type="checkbox"
          id="agreeToPrivacyPolicy"
          checked={formData.agreeToPrivacyPolicy}
          onChange={handleInputChange}
        />
        <span className="text-sm">I’ve read and accept the <Link href={'#'} className="text-orange cursor-pointer underline">Privacy Policy</Link></span>
      </div>
      <button type="submit">SEND</button>
    </form>
  );
}

export default RegistrationForm;
