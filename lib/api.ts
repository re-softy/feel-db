import axios from "axios";
import { SearchMediaParams, PaginatedResponse } from "@/types/types";

let cachedBannerData: any = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export async function fetchMainPageData() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}movies/Main-Page`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchRandomPosters() {
  try {
    const now = Date.now();
    if (cachedBannerData && (now - cacheTimestamp) < CACHE_DURATION) {
      return cachedBannerData;
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}movies/random-posters`,
      {
        timeout: 5000,
        headers: {
          'Cache-Control': 'public, max-age=300'
        }
      }
    );
    
    cachedBannerData = response.data;
    cacheTimestamp = now;
    
    return response.data;
  } catch (error) {
    console.error("Error fetching random posters:", error);
    return cachedBannerData || { data: [] };
  }
}

export async function getGenres() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}genres`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return null;
  }
}

export async function getEmotions() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}emotions`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching emotions:", error);
    return null;
  }
}

export async function getCategories() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}categories`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return null;
  }
}

export async function searchMedia({
  keyword = "",
  category = "",
  genres = [] as number[],
  emotions = [] as number[],
  people = "",
  imdb_min = null,
  year_min = null,
  year_max = null,
  page = 1,
  per_page = 20,
}: SearchMediaParams): Promise<PaginatedResponse> {
  try {
    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.append("keyword", keyword.trim());
    }
    
    if (category.trim()) {
      params.append("category", category.trim());
    }
    
    if (people.trim()) {
      params.append("people", people.trim());
    }

    if (genres.length > 0) {
      genres.forEach((genreId) => params.append("genre", genreId.toString()));
    }

    if (emotions.length > 0) {
      emotions.forEach((emotionId) => params.append("emotion", emotionId.toString()));
    }

    if (imdb_min !== null && imdb_min > 0) {
      params.append("imdb_min", imdb_min.toString());
    }

    if (year_min !== null && year_min > 1900) {
      params.append("year_min", year_min.toString());
    }
    
    if (year_max !== null && year_max < new Date().getFullYear()) {
      params.append("year_max", year_max.toString());
    }

    if (page !== 1) {
      params.append("page", page.toString());
    }
    
    if (per_page !== 20) {
      params.append("per_page", per_page.toString());
    }

    const queryString = params.toString();
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}movies/search-advanced${queryString ? `?${queryString}` : ''}`;

    const response = await axios.get<PaginatedResponse>(url, {
      headers: {
        'Cache-Control': 'public, max-age=60'
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error in search media:", error);
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        throw new Error('Search request timed out. Please try again.');
      }
      console.error("Status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    }
    throw error;
  }
}

export async function fetchHighRated() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}movies/high-rated`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchLastReleasedAnimation() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}movies/animations`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchLastReleasedSeries() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}movies/series`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export async function fetchSingleMedia(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}movies/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching single media:", error);
    return null;
  }
}

export async function fetchUserData(authToken?: string) {
  try {
    let token = authToken;
    if (typeof window !== "undefined" && !token) {
      token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="))
        ?.split("=")[1];
    }

    if (!token) {
      return null;
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      console.error("Authentication failed - token may be invalid or expired");
      console.error("Response data:", error.response.data);
    } else {
      console.error("Error fetching user data:", error.message);
      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Response data:", error.response.data);
      }
    }
    return null;
  }
}