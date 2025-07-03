"use server";

import axios from "axios";
import { getSession } from "@/lib/session";

export async function getUserVotingHistoryAction(page: number = 1, per_page: number = 20) {
  try {
    const token = await getSession();
    
    if (!token) {
      return {
        success: false,
        data: [],
        pagination: {
          current_page: 1,
          last_page: 1,
          per_page: 20,
          total: 0
        },
        error: "Not authenticated",
      };
    }

    const params = new URLSearchParams();
    if (page !== 1) {
      params.append('page', page.toString());
    }
    if (per_page !== 20) {
      params.append('per_page', per_page.toString());
    }

    const queryString = params.toString();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}voting-history${queryString ? `?${queryString}` : ''}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const transformedData = response.data?.data?.map((item: any) => ({
      ...item,
      id: item.movie_id.toString(),
      title: item.title_en,
      title_en: item.title_en,
      release_year: item.release_year,
      rating: item.imdb_rank || 0,
      runtime: item.runtime || "0",
      imdb_rank: item.imdb_rank || 0,
      imdb_votes: item.imdb_votes || 0,
      description: item.description,
      cover_path: item.cover_path || "",
      poster_path: item.poster_path || "",
      genres_names: item.genres_names || "",
      directors_data: [],
      writers_data: [],
      actors_data: []
    })) || [];

    return {
      success: true,
      data: transformedData,
      pagination: response.data?.pagination || {
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 0
      }
    };
  } catch (error: any) {
    console.error("Error in getUserVotingHistoryAction:", error.message);
    return {
      success: false,
      data: [],
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 0
      },
      error: error.message || "Failed to fetch voting history",
    };
  }
}