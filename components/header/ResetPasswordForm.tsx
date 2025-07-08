"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SendRecoveryEmail } from "@/lib/actions/auth";

interface ResetPasswordFormProps {
  onSuccess?: (email: string) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`bg-orange py-2 px-10 rounded-full tracking-wide ${
        pending ? "opacity-50 cursor-not-allowed" : "hover:bg-orange/90"
      }`}
    >
      {pending ? "Sending..." : "Get Code"}
    </button>
  );
}

function ResetPasswordForm({ onSuccess }: ResetPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [state, formAction] = useFormState(SendRecoveryEmail, {
    ok: false,
    message: "",
  });

  useEffect(() => {
    if (state.message) {
      if (state.ok) {
        toast.success(state.message);
        if (onSuccess && email) {
          onSuccess(email);
        }
      } else {
        toast.error(state.message);
      }
    }
  }, [state, onSuccess, email]);

  return (
    <form action={formAction} className="my-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your-email@example.com"
            className={`w-full bg-black text-white p-2 border rounded-md focus:outline-none ${
              state.errors?.email
                ? "border-red-500"
                : "border-grey focus:border-orange"
            }`}
            required
          />
        </div>

        <SubmitButton />
      </div>
    </form>
  );
}

export default ResetPasswordForm;