"use client"
import { useState } from 'react';
import Image from 'next/image';

import AuthIcon from '@/components/assets/AuthIcon.svg';  

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";

import RegistrationForm from './RegistrationForm';
import SignInForm from './SignInForm';
import ResetPasswordForm from './ResetPasswordForm';

interface AuthButtonProps {
  initialMode?: 'register' | 'signin' | 'reset';
  triggerElement?: React.ReactNode;
}

function AuthButton({ initialMode = 'register', triggerElement }: AuthButtonProps) {
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

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
      {triggerElement || (
          <button onClick={() => setIsOpen(true)}>
           <Image src={AuthIcon} alt="Auth Icon" width={24} height={24} className="w-7 h-7 cursor-pointer" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
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
                Don’t have an account?{' '}
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

        {dialogMode === 'register' &&  <RegistrationForm onRegistrationSuccess={switchToSignIn} /> }
        {dialogMode === 'signin' && <SignInForm onForgotPassword={switchToReset} />}
        {dialogMode === 'reset' && <ResetPasswordForm />}

      </DialogContent>
    </Dialog>
  );
}

export default AuthButton;
