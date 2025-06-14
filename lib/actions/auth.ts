"use server";

import axios from "axios";
import { ZodError } from "zod";
import { redirect } from "next/navigation";

import { FormState } from "@/types/types";
import { registrationSchema, signInSchema } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";

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
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedData = registrationSchema.parse({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      password_confirmation: formData.get("password_confirmation") as string,
      agreeToPrivacyPolicy: formData.has("agreeToPrivacyPolicy"),
    });

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/signup`,
      validatedData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (response.status === 201 || response.status === 200) {
      return {
        ok: true,
        message: "Registration successful!",
      };
    } else {
      return {
        ok: false,
        message: "Registration failed. Please try again.",
      };
    }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return {
        ok: false,
        message: "",
        errors: error.errors.reduce((acc: Record<string, string[]>, err) => {
          acc[err.path[0]] = [...(acc[err.path[0]] || []), err.message];
          return acc;
        }, {}),
      };
    }
    return handleAuthError(error);
  }
}

export async function SignInUser(formData: FormData): Promise<void> {
  const validatedData = signInSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}user/signin`,
    validatedData,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  const token = response.data?.token;
  if (!token) throw new Error("No token received from server");
  await createSession(token);
  redirect("/profile");
}

export default async function SignOutUser(): Promise<void> {
  try {
    const { cookies } = await import("next/headers");
    const authToken = cookies().get("auth_token");

    await deleteSession();

    if (!authToken) {
      redirect("/");
    }

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${authToken.value}`,
        },
      }
    );

    redirect("/");
  } catch (error: any) {
    console.error("Sign out error:", error.message);
    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    }
    redirect("/");
  }
}