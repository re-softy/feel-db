export interface MediaItem {
  id: string;
  title?: string;
  year: number;
  rating: number;
  runtime: string;
  imdb: number;
  genres: string | string[];
  description: string | null;
  poster: string;
  feels_total_count: number;
  top_three_emotions?: { name: string; count: number }[];
}

export interface AllContentProps {
  mediaItems: MediaItem[];
}

export type FormState = {
  ok: boolean;
  message: string;
  data?: any;
  errors?: any;
};
