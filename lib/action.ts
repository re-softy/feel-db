"use server";

import axios from "axios";

import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
      "Password must include uppercase, lowercase, number, and special character"),
  confirmPassword: z.string(),
  agreeToPrivacyPolicy: z.boolean().refine(val => val === true, {
    message: "You must agree to the privacy policy"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type FormState = {
  ok: boolean;
  message: string;
  data?: any;
  errors?: any;
};

export async function CreateUser(state: FormState, formData: FormData): Promise<FormState> {
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
    agreeToPrivacyPolicy: formData.get('agreeToPrivacyPolicy') === 'on'
  };

  try {
    const validatedData = registrationSchema.parse(data);
    const { confirmPassword, ...submitData } = validatedData;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/signup`,
      submitData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      ok: true,
      message: "User registered successfully",
      data: response.data,
    };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        ok: false,
        message: error.errors[0].message,
        errors: error.flatten().fieldErrors
      };
    }

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        return { 
          ok: false, 
          message: "User with that email already exists" 
        };
      }
      if (error.response?.status === 500) {
        return { 
          ok: false, 
          message: "Server error. Please try again later." 
        };
      }
    }

    return { 
      ok: false, 
      message: error.message || "Failed to register user" 
    };
  }
}