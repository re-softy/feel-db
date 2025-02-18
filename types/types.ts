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
  mediaItems: PaginatedResponse;
}

export type FormState = {
  ok: boolean;
  message: string;
  data?: any;
  errors?: any;
};

export interface PaginatedResponse {
  current_page: number;
  total: number;
  per_page: number;
  last_page: number;
  hasNextPage: boolean;
  data: MediaItem[];
}

export interface PageProps {
  searchParams: { page?: string };
}

export type SignInFormProps = {
  onForgotPassword: () => void;
};
