"use server";

import axios from "axios";
import { getSession } from "@/lib/session";

export async function addMovieToFavoritesAction(movieId: string) {
  try {
    const token = await getSession();

    if (!token) {
      return {
        success: false,
        error: "Authentication is required to add to favorites.",
      };
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}movies/${movieId}/add-favorite`,
      {},
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

  }
  catch (error: any) {
    console.error("Error adding movie to favorites:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      return {
        success: false,
        error: error.response.data.message || "Failed to add movie to favorites.",
      };
    }
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
}

export async function removeMovieFromFavoritesAction(movieId: string) {
  try {
    const token = await getSession();

    if (!token) {
      return {
        success: false,
        error: "Authentication is required to remove from favorites.",
      };
    }

    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}movies/${movieId}/remove-favorite`,
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

  }
  catch (error: any) {
    console.error("Error removing movie from favorites:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      return {
        success: false,
        error: error.response.data.message || "Failed to remove movie from favorites.",
      };
    }
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
}

export async function getUserFavoritesAction() {
  try {
    const token = await getSession();

    if (!token) {
      return {
        success: false,
        data: [],
        error: "Not authenticated",
      };
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}favorites`,
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
      data: response.data?.data?.data || [],
    };

  } catch (error: any) {
    console.error("Error fetching favorites:", error.message);
    return {
      success: false,
      data: [],
      error: error.message || "Failed to fetch favorites",
    };
  }
}