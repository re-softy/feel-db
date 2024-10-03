export async function fetchMainPageData() {
    try {
      const response = await fetch(
        `${process.env.API_BASE_URL}mainpage`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }