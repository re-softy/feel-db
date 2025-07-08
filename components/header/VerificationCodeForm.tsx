"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { VerifyResetCode } from "@/lib/actions/auth";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface VerificationCodeFormProps {
  email: string;
  onResendCode: () => void;
  onBack: () => void;
  onSuccess?: () => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full bg-orange py-3 px-6 rounded-full tracking-wide text-white font-medium ${
        pending ? "opacity-50 cursor-not-allowed" : "hover:bg-orange/90"
      }`}
    >
      {pending ? "Resetting..." : "Reset Password"}
    </button>
  );
}

function VerificationCodeForm({ email, onResendCode, onBack, onSuccess }: VerificationCodeFormProps) {
  const [code, setCode] = useState(['', '', '', '']);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [state, formAction] = useFormState(VerifyResetCode, {
    ok: false,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      if (state.ok) {
        toast.success(state.message);
        if (onSuccess) {
          setTimeout(() => {
            onSuccess();
          }, 2000);
        }
      } else {
        toast.error(state.message);
      }
    }
  }, [state, onSuccess]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^[0-9]*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    const newCode = ['', '', '', ''];
    
    for (let i = 0; i < pastedData.length; i++) {
      newCode[i] = pastedData[i];
    }
    
    setCode(newCode);
    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Enter send code</h3>
        <p className="text-sm text-gray-400">
          We sent a verification code to {email}
        </p>
      </div>

      <form action={formAction} className="w-full space-y-4">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="code" value={code.join('')} />
        <input type="hidden" name="password" value={password} />
        <input type="hidden" name="password_confirmation" value={passwordConfirmation} />

        <div className="flex justify-center space-x-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-12 h-12 text-center text-lg font-medium bg-black border border-grey rounded-md focus:outline-none focus:border-orange"
              required
            />
          ))}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={onResendCode}
            className="text-orange hover:underline text-sm"
          >
            Resend Code
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="new-password" className="text-sm font-medium">New Password</label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none focus:border-orange"
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
          {state.errors?.password && (
            <div className="text-red-500 text-xs mt-1">
              {state.errors.password.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
          <div className="relative">
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              id="confirm-password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Confirm new password"
              className="w-full bg-black text-white p-2 border border-grey rounded-md focus:outline-none focus:border-orange"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm"
            >
              {isConfirmPasswordVisible ? (
                <VisibilityOffIcon fontSize="small" className="text-gray-400" />
              ) : (
                <VisibilityIcon fontSize="small" className="text-gray-400" />
              )}
            </button>
          </div>
          {state.errors?.password_confirmation && (
            <div className="text-red-500 text-xs mt-1">
              {state.errors.password_confirmation.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )}
        </div>

        <SubmitButton />
      </form>
    </div>
  );
}

export default VerificationCodeForm; 