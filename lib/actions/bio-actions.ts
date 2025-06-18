"use server";

import { cookies } from "next/headers";
import axios from "axios";

export async function updateBioAction(bio: string) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return {
        success: false,
        error: "Authentication is required to update bio.",
      };
    }

    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}add-bio`,
      { bio },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        success: false,
        error: error.response.data.message || "Failed to update bio.",
      };
    }
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
} 