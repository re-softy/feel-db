"use server";

import axios from "axios";

import { z, ZodError } from "zod";

import { FormState } from "@/types/types";

const registrationSchema = z
  .object({
    name: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string(),
    agreeToPrivacyPolicy: z.boolean(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function handleAuthError(error: any): FormState {
  if (error.response) {
    return {
      ok: false,
      message: error.response.data.message || "Request failed",
      errors: error.response.data.errors,
    };
  }
  return {
    ok: false,
    message: error.message || "An unexpected error occurred",
  };
}

export async function CreateUser(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedData = registrationSchema.parse({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      password_confirmation: formData.get("password_confirmation") as string,
      agreeToPrivacyPolicy: formData.get("agreeToPrivacyPolicy") === "true",
    });

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/signup`,
      validatedData, 
      { headers: { "Content-Type": "application/json", Accept: "application/json" } }
    );

    return { ok: true, message: "User registered successfully", data: response.data };
  } catch (error: any) {
    if (error instanceof ZodError) {
      return {
        ok: false,
        message: "Validation failed",
        errors: error.errors.reduce((acc: Record<string, string[]>, err) => {
          acc[err.path[0]] = [...(acc[err.path[0]] || []), err.message];
          return acc;
        }, {}),
      };
    }
    return handleAuthError(error);
  }
}

export async function SignInUser(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedData = signInSchema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/signin`,
      validatedData,
      { headers: { "Content-Type": "application/json", Accept: "application/json" } }
    );

    return { ok: true, message: "Login successful", data: response.data };
  } catch (error: any) {
    return handleAuthError(error);
  }
}
