import { z } from "zod";

export const registrationSchema = z
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

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});