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
  emotions?: { id: number; name: string; count: number }[];
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

export interface BannerItemProps {
  backgroundImage: string;
  title: string;
  isMain?: boolean;
  showAdditionalInfo?: boolean;
  mediaData?: Partial<MediaItem>;
}

export type Emotion = {
  id: number;
  name: string;
  icon: string | null;
  color: string | null;
  emotion_ka: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string | null;
};

export type Genre = {
  id: number;
  genre: string;
};

export interface EmotionFilterProps {
  emotions: any[];
  categories: any[];
  genres: any[];
  isLoading: boolean;
  onClose: () => void;
  onApplyFilters?: (filters: {
    emotion: number | null;
    category: number | null;
    genres: number[];
    imdbRating: string | null;
    yearRange: { startYear: number; endYear: number };
  }) => void;
}

export interface SearchBarProps {
  onSearchFocus?: () => void;
  emotionsData?: any[];
  categoriesData?: any[];
  genresData?: any[];
  isDataLoading?: boolean;
}