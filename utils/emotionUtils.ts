import { MediaItem } from "@/types/types";

/**
 * Get the top emotions from a media item sorted by count
 * @param media The media item containing emotions data
 * @param limit The maximum number of emotions to return (default: 3)
 * @returns Array of top emotions with percentage calculated
 */
export function getTopEmotions(media: Partial<MediaItem> | undefined, limit: number = 3) {
  if (!media?.emotions || media.emotions.length === 0) {
    return [];
  }

  // Sort emotions by count (highest first) and take the top N
  const sortedEmotions = [...media.emotions]
    .sort((a, b) => b.count - a.count)
    .filter(emotion => emotion.count > 0)
    .slice(0, limit);

  // Calculate total count for percentage calculation
  const totalCount = media.emotions.reduce((sum, emotion) => sum + emotion.count, 0);

  // Add percentage to each emotion
  return sortedEmotions.map(emotion => ({
    ...emotion,
    percentage: totalCount > 0 ? (emotion.count / totalCount) * 100 : 0
  }));
}

/**
 * Get the total count of all emotions for a media item
 * @param media The media item containing emotions data
 * @returns Total count of all emotions
 */
export function getTotalEmotionCount(media: Partial<MediaItem> | undefined) {
  if (!media?.emotions || media.emotions.length === 0) {
    return 0;
  }
  
  return media.emotions.reduce((sum, emotion) => sum + emotion.count, 0);
}

/**
 * Format runtime from "X hour Y minutes" to "Xh Ym"
 * @param runtime The runtime string to format
 * @returns Formatted runtime string
 */
export function formatRuntime(runtime: string | undefined) {
  if (!runtime) return "";
  return runtime.replace("hour", "h").replace("minutes", "m").replace(/\s+/g, " ");
}

/**
 * Format genres consistently with spaces as separators
 * @param genres The genres data from the API (can be array or comma-separated string)
 * @param separator The separator to use between genres (default: ' ')
 * @returns Formatted genres string with consistent separators
 */
export function formatGenres(genres: string | string[] | undefined, separator: string = ' ') {
  if (!genres) return "";
  
  if (Array.isArray(genres)) {
    return genres.join(separator);
  }
  
  if (typeof genres === 'string') {
    return genres.split(',').map(genre => genre.trim()).join(separator);
  }
  
  return "";
}