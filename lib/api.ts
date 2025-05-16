import axios from "axios";

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
    console.log(response.data);
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
    if (typeof window !== 'undefined' && !token) {
      token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("auth_token="))
        ?.split("=")[1];
    }
    
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}user/me`, {
      headers: token ? {
        Authorization: `Bearer ${token}`
      } : {},
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}