"use client"
import { useState } from 'react';
import Link from 'next/link';
import Image from "next/image";
import Avatar2 from "@/components/assets/Avatar2.png";
import AuthIcon from '@/components/assets/AuthIcon.svg';  
import LogoutButton from './LogoutButton';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import RegistrationForm from './RegistrationForm';
import SignInForm from './SignInForm';
import ResetPasswordForm from './ResetPasswordForm';

import PersonIcon from '@mui/icons-material/Person';

interface AuthButtonProps {
  initialMode?: 'register' | 'signin' | 'reset';
  triggerElement?: React.ReactNode;
  isAuthenticated?: boolean;
}

function AuthButton({ initialMode = 'register', triggerElement, isAuthenticated }: AuthButtonProps) {
  const [dialogMode, setDialogMode] = useState<'register' | 'signin' | 'reset'>(initialMode);
  const [isOpen, setIsOpen] = useState(false);

  const switchToSignIn = () => setDialogMode('signin');
  const switchToRegister = () => setDialogMode('register');
  const switchToReset = () => setDialogMode('reset');

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setDialogMode('register');
    }
  };

  if (isAuthenticated) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className="outline-none">
            <div className="w-12 h-12">
              <Image src={Avatar2} alt='Avatar' layout="responsive" width={20} height={20} className="rounded-full" />
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-2 bg-black">
          <div className="space-y-4">
            <Link 
              href="/profile" 
              className="flex items-center w-full p-4 rounded hover:bg-[#262626]"
            >
              <PersonIcon className="mr-2" />
              Profile
            </Link>
              <LogoutButton />
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        {triggerElement || (
          <button onClick={() => setIsOpen(true)}>
            <Image src={AuthIcon} alt="Auth Icon" width={24} height={24} className="w-7 h-7 cursor-pointer" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {dialogMode === 'register' ? 'Registration' : dialogMode === 'signin' ? 'Sign In' : 'Reset Password'}
          </DialogTitle>
          <DialogDescription>
            {dialogMode === 'register' ? (
              <>
                Already have an account?{' '}
                <span onClick={switchToSignIn} className="text-orange cursor-pointer underline">Sign In Here</span>
              </>
            ) : dialogMode === 'signin' ? (
              <>
                Don&apos;t have an account?{' '}
                <span onClick={switchToRegister} className="text-orange cursor-pointer underline">Register Here</span>
              </>
            ) : (
              <>
                Remembered your password?{' '}
                <span onClick={switchToSignIn} className="text-orange cursor-pointer underline">Sign In</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {dialogMode === 'register' && <RegistrationForm onRegistrationSuccess={switchToSignIn} />}
        {dialogMode === 'signin' && <SignInForm onForgotPassword={switchToReset} />}
        {dialogMode === 'reset' && <ResetPasswordForm />}
      </DialogContent>
    </Dialog>
  );
}

export default AuthButton;