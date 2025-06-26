import { fetchRandomPosters } from "@/lib/api";
import { unstable_cache } from 'next/cache';

export const getCachedBannerData = unstable_cache(
  async () => {
    try {
      const response = await fetchRandomPosters();
      return response?.data || [];
    } catch (error) {
      console.error('Failed to fetch banner data:', error);
      return [];
    }
  },
  ['banner-data'],
  { 
    revalidate: 3600,
    tags: ['banner']
  }
);