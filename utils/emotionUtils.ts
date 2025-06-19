import { MediaItem, Emotion } from "@/types/types";
/**
 * Get the top emotions from a media item sorted by votes
 * @param media The media item containing emotions data
 * @param limit The maximum number of emotions to return (default: 3)
 * @returns Array of top emotions with percentage already included
 */
export function getTopEmotions(media: Partial<MediaItem> | undefined, limit: number = 3) {
  if (media?.active_emotions_data && Object.keys(media.active_emotions_data).length > 0) {
    const emotionsArray = Object.values(media.active_emotions_data as Record<string, Emotion>);
    
    const topEmotions = emotionsArray
      .filter((emotion: Emotion) => emotion.votes > 0)
      .slice(0, limit);

    return topEmotions.map((emotion: Emotion) => ({
      id: emotion.id,
      name: emotion.name,
      count: emotion.votes_formatted || emotion.votes,
      percentage: emotion.percentage
    }));
  }

  if (!media?.emotions || Object.keys(media.emotions).length === 0) {
    return [];
  }

  const emotionsArray = Object.values(media.emotions as Record<string, Emotion>);
  
  const topEmotions = emotionsArray
    .filter(emotion => emotion.votes > 0)
    .slice(0, limit);

  return topEmotions.map(emotion => ({
    id: emotion.id,
    name: emotion.name,
    count: emotion.votes_formatted || emotion.votes, 
    percentage: emotion.percentage
  }));
}

/**
 * Get the total count of all emotions for a media item
 * @param media The media item containing emotions data
 * @returns Total count of all emotions
 */
export function getTotalEmotionCount(media: Partial<MediaItem> | undefined) {
  if (!media?.emotions || Object.keys(media.emotions).length === 0) {
    return 0;
  }
  
  const emotionsArray = Object.values(media.emotions as Record<string, Emotion>);
  return emotionsArray.reduce((sum, emotion) => sum + emotion.votes, 0);
}

/**
 * Get a specific emotion by name
 * @param media The media item containing emotions data
 * @param emotionName The name of the emotion to retrieve
 * @returns The emotion object or undefined if not found
 */
export function getEmotionByName(media: Partial<MediaItem> | undefined, emotionName: string) {
  if (!media?.emotions) {
    return undefined;
  }
  
  const emotion = (media.emotions as Record<string, Emotion>)[emotionName];
  if (!emotion) return undefined;
  
  return {
    id: emotion.id,
    name: emotion.name,
    count: emotion.votes_formatted || emotion.votes,
    percentage: emotion.percentage
  };
}

/**
 * Get all emotions as an array (for compatibility with your original interface)
 * @param media The media item containing emotions data
 * @returns Array of all emotions
 */
export function getAllEmotionsAsArray(media: Partial<MediaItem> | undefined) {
  const emotionsData = media?.active_emotions_data || media?.emotions;

  if (!emotionsData || Object.keys(emotionsData).length === 0) {
    return [];
  }
  
  const emotionsArray = Object.values(emotionsData as Record<string, Emotion>);
  return emotionsArray.map(emotion => ({
    id: emotion.id,
    name: emotion.name,
    count: emotion.votes_formatted || emotion.votes,
    votes: emotion.votes,
    percentage: emotion.percentage
  }));
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

export const getGenresArray = (genres: string | string[] | undefined): string[] => {
  if (!genres) return [];
  if (Array.isArray(genres)) return genres;
  return genres.split(',').map(genre => genre.trim()).filter(Boolean);
};