import axios from "axios";
import { SearchMediaParams, PaginatedResponse } from '@/types/types';

export async function fetchMainPageData() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}mainpage`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
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
  keyword = '',
  category = '',
  genres = [] as number[],
  emotions = [] as number[], 
  imdb_min = null,
  year_min = null,
  year_max = null,
  page = 1,
  per_page = 20
}: SearchMediaParams): Promise<PaginatedResponse> {
  try {
    const params = new URLSearchParams();

    if (keyword) params.append('keyword', keyword);
    if (category) params.append('category', category);

    genres.forEach((genreId) =>
      params.append("genre[]", genreId.toString())
    );
    emotions.forEach((emotionId) =>
      params.append("emotions[]", emotionId.toString())
    );

    if (imdb_min !== null) params.append("imdb_min", imdb_min.toString());
    if (year_min !== null) params.append("year_min", year_min.toString());
    if (year_max !== null) params.append("year_max", year_max.toString());
    
    params.append("page", page.toString());
    params.append("per_page", per_page.toString());

    const response = await axios.get<PaginatedResponse>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}search-advanced?${params.toString()}`
    );
    
    return response.data;
  } catch (error) {
    console.error('Error in search media:', error);
    if (axios.isAxiosError(error)) {
      console.error('Status:', error.response?.status);
      console.error('Response data:', error.response?.data);
    }
    throw error;
  }
};

export async function fetchHighRated() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}high-rated`
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}animations`
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
      `${process.env.NEXT_PUBLIC_API_BASE_URL}series`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
// export async function fetchCollection(page: number = 1) {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}collections?page=${page}`
//     );

//     const nextPageCheck = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}collections?page=${page + 1}`
//     );

//     return {
//       ...response.data,
//       hasNextPage: nextPageCheck.data.data.length > 0
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// }

// export async function fetchDayTop() {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}daytop`
//     );
//     console.log(response.data)
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// }

export async function fetchSingleMedia(id: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}collections/${id}`
    );
    return response.data.collection;
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

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}user/me`,
      {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}