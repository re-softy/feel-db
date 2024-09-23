"use client"
import { useState } from 'react';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import RegistrationForm from './RegistrationForm';
import SignInForm from './SignInForm';
import ResetPasswordForm from './ResetPasswordForm';

function AuthButton() {
  const [dialogMode, setDialogMode] = useState<'register' | 'signin' | 'reset'>('register');
  const [isOpen, setIsOpen] = useState(false);

  const switchToSignIn = () => setDialogMode('signin');
  const switchToRegister = () => setDialogMode('register');
  const switchToReset = () => setDialogMode('reset');

  const handleDialogChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset to registration mode when dialog is closed
      setDialogMode('register');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>
        <button>
          <PermIdentityIcon />
        </button>
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
                <span onClick={switchToSignIn} className="text-blue-600 cursor-pointer">Sign In</span>
              </>
            ) : dialogMode === 'signin' ? (
              <>
                Don’t have an account?{' '}
                <span onClick={switchToRegister} className="text-blue-600 cursor-pointer">Register</span>
              </>
            ) : (
              <>
                Remembered your password?{' '}
                <span onClick={switchToSignIn} className="text-blue-600 cursor-pointer">Sign In</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        {dialogMode === 'register' && <RegistrationForm />}
        {dialogMode === 'signin' && <SignInForm onResetPassword={switchToReset} />}
        {dialogMode === 'reset' && <ResetPasswordForm />}

        <DialogFooter>
          {dialogMode === 'register' && <button type="submit">Sign Up</button>}
          {dialogMode === 'signin' && <button type="submit">Sign In</button>}
          {dialogMode === 'reset' && <button type="submit">Send Reset Link</button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AuthButton;
