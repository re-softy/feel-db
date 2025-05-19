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

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedData {
  current_page: number;
  data: MediaItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface AllContentProps {
  mediaItems: MediaItem[] | PaginatedData;
}

export type FormState = {
  ok: boolean;
  message: string;
  data?: any;
  errors?: any;
};

export interface PaginatedResponse {
  status: string;
  data: PaginatedData;
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
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

export interface SearchBarProps {
  onSearchFocus?: () => void;
  emotionsData?: any[];
  categoriesData?: any[];
  genresData?: any[];
  isDataLoading?: boolean;
  onSearchResults?: (results: any[], total: number) => void;
}

export interface SearchInputProps {
  emotionsData: any[];
  categoriesData: any[];
  genresData: any[];
  searchKeyword: string;
  onSearchKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterState: {
    selectedEmotion: number | null;
    selectedCategory: number | null;
    selectedGenres: number[];
    selectedImdbRating: string | null;
    yearRange?: {
      startYear: number;
      endYear: number;
    };
  };
  filterHandlers: {
    handleEmotionSelect: (id: number) => void;
    handleCategorySelect: (id: number) => void;
    handleGenreSelect: (id: number) => void;
    handleImdbRatingSelect: (rating: string) => void;
    handleYearRangeChange?: (range: {
      startYear: number;
      endYear: number;
    }) => void;
  };
}

export interface EmotionFilterProps {
  emotions: any[];
  categories: any[];
  genres: any[];
  onClose: () => void;
  filterState: {
    selectedEmotion: number | null;
    selectedCategory: number | null;
    selectedGenres: number[];
    selectedImdbRating: string | null;
    yearRange?: {
      startYear: number;
      endYear: number;
    };
  };
  filterHandlers: {
    handleEmotionSelect: (id: number) => void;
    handleCategorySelect: (id: number) => void;
    handleGenreSelect: (id: number) => void;
    handleImdbRatingSelect: (rating: string) => void;
    handleYearRangeChange?: (range: {
      startYear: number;
      endYear: number;
    }) => void;
  };
  onSearch: () => void;
}
export interface SearchMediaParams {
  keyword?: string;
  category?: string;
  genres?: number[];
  emotions?: number[];
  imdb_min?: number | null;
  year_min?: number | null;
  year_max?: number | null;
  page?: number;
  per_page?: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string | string[] | undefined>;
}
