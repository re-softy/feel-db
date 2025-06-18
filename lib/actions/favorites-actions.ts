"use server";

import { cookies } from "next/headers";
import axios from "axios";

export async function addMovieToFavoritesAction(movieId: string) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return {
        success: false,
        error: "Authentication is required to add to favorites.",
      };
    }

    const url = `https://api.feeldb.com/api/movies/${movieId}/add-favorite`;
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log('Response data:', response.data);
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