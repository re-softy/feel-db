"use server";

import { cookies } from "next/headers";
import axios from "axios";

export async function uploadAvatarAction(formData: FormData) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return {
        success: false,
        error: "Authentication is required to upload avatar.",
      };
    }

    const file = formData.get("avatar") as File;
    if (!file || file.size === 0) {
      return {
        success: false,
        error: "No file selected for upload.",
      };
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: "Invalid file type. Please upload a JPEG, PNG, or WebP image.",
      };
    }

    const maxSize = 2048 * 1024;
    if (file.size > maxSize) {
      return {
        success: false,
        error: "File size too large. Please upload an image smaller than 2MB.",
      };
    }

    const uploadFormData = new FormData();
    uploadFormData.append('avatar', file);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/avatar`,
      uploadFormData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 30000,
      }
    );

    return {
      success: true,
      data: response.data,
      message: "Avatar uploaded successfully!",
    };
  } catch (error: any) {
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        error: "Upload timed out. Please try again with a smaller file.",
      };
    }
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           error.response.data?.errors?.[0]?.message ||
                           `HTTP ${error.response.status}: ${error.response.statusText}`;
      
      return {
        success: false,
        error: errorMessage,
      };
    }
    
    if (error.request) {
      if (error.code === 'ERR_NETWORK') {
        return {
          success: false,
          error: "Network error. Please check if the API server is running and accessible.",
        };
      }
      
      return {
        success: false,
        error: `No response from server: ${error.message}. Please check your connection and try again.`,
      };
    }
    
    return {
      success: false,
      error: error.message || "An unknown error occurred during upload.",
    };
  }
} 