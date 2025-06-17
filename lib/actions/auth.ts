"use server";

import axios from "axios";
import { ZodError } from "zod";
import { redirect } from "next/navigation";

import { FormState } from "@/types/types";
import { registrationSchema, signInSchema } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/session";
import { cookies } from "next/headers";

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

export async function SignInUser(_: any, formData: FormData) {
  try {
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
    if (!token) {
      return { error: "No token received from server" };
    }

    await createSession(token);
    redirect("/profile");
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT") throw error;

    if (error instanceof ZodError) {
      return { error: "Please check your input fields" };
    }

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "Authentication failed";
      const errors = error.response.data?.errors || {};

      if (message.includes("No query results") || message.includes("Login failed")) {
        return { error: "You should register first" };
      }

      if (status === 422) {
        if (errors.password) {
          return { error: "Password is incorrect" };
        }
        if (errors.email) {
          return { error: "You should register first" };
        }
      }

      if (status === 401) return { error: "Password is incorrect" };
      if (status === 404) return { error: "You should register first" };
      return { error: message };
    }

    if (error.code === "ENOTFOUND" || error.code === "ECONNREFUSED") {
      return { error: "Cannot connect to server. Please try again later." };
    }

    return { error: "Sign in failed. Please try again." };
  }
}


export default async function SignOutUser(): Promise<void> {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get("auth_token");

    if (authToken) {
      try {
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
      } catch (apiError) {
        console.error("API logout error:", apiError);
      }
    }
    await deleteSession();
  } catch (error: any) {
    console.error("Sign out error:", error.message);

    try {
      await deleteSession();
    } catch (deleteError) {
      console.error("Error deleting session:", deleteError);
    }
  } finally {
    redirect("/");
  }
}