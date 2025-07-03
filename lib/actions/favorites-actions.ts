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
  } catch (error: any) {
    console.error("Error adding movie to favorites:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      return {
        success: false,
        error:
          error.response.data.message || "Failed to add movie to favorites.",
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
  } catch (error: any) {
    console.error("Error removing movie from favorites:", error.message);
    if (error.response) {
      console.error("Response data:", error.response.data);
      return {
        success: false,
        error:
          error.response.data.message ||
          "Failed to remove movie from favorites.",
      };
    }
    return {
      success: false,
      error: error.message || "An unknown error occurred.",
    };
  }
}

export async function getUserFavoritesAction(page?: number, per_page?: number) {
  try {
    const token = await getSession();

    if (!token) {
      return {
        success: false,
        data: [],
        pagination: {
          current_page: 1,
          last_page: 1,
          per_page: per_page || 20,
          total: 0,
        },
        error: "Not authenticated",
      };
    }

    const params = new URLSearchParams();
    if (page && page !== 1) {
      params.append("page", page.toString());
    }
    if (per_page) {
      params.append("per_page", per_page.toString());
    }

    const queryString = params.toString();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}favorites${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const apiResponseData = response.data?.data;

    return {
      success: true,
      data: apiResponseData?.data || [],
      pagination: {
        current_page: apiResponseData?.current_page || 1,
        last_page: apiResponseData?.last_page || 1,
        per_page: apiResponseData?.per_page || per_page || 20,
        total: apiResponseData?.total || 0,
      },
    };
  } catch (error: any) {
    console.error("Error fetching favorites:", error.message);
    return {
      success: false,
      data: [],
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: per_page || 20,
        total: 0,
      },
      error: error.message || "Failed to fetch favorites",
    };
  }
}