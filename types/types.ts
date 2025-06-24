export interface MediaItem {
  id: string;
  title_en: string;
  release_year: number;
  rating: number;
  runtime: string;
  imdb_rank: number;
  description: string | null;
  cover_path: string;
  imdb_votes: number;
  emotions?: Record<string, Emotion>;
  active_emotions_data?: Record<string, Emotion>;
  poster_path?: string;
  genres_names?: string;
  genres_list?: Array<{ id: number, name: string }>;
  directors_data: PersonData[];
  writers_data: PersonData[];
  actors_data: PersonData[];
}

export type Emotion = {
  id: number;
  name: string;
  name_ka: string; 
  icon: string | null;
  color: string | null;
  votes: number;
  votes_formatted?: string;
  percentage: number;
};
export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedData {
  length: number;
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

export type Category = {
  id: number;
  name: string;
  slug: string | null;
};

export type Genre = {
  id: number;
  name: string;
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
    selectedEmotions: number[];
    selectedCategory: number | null;
    selectedGenres: number[];
    selectedImdbRating: string | null;
    yearRange: number[];
  };
  filterHandlers: {
    handleEmotionSelect: (id: number) => void;
    handleCategorySelect: (id: number) => void;
    handleGenreSelect: (id: number) => void;
    handleImdbRatingSelect: (rating: string) => void;
    handleYearRangeSelect: (range: number[]) => void;
  };
  onSearch: () => void;
}

export interface EmotionFilterProps {
  emotions: any[];
  genres: any[];
  onClose: () => void;
  filterState: {
    selectedEmotions: number[];
    selectedGenres: number[];
    selectedImdbRating: string | null;
    yearRange: number[];
  };
  filterHandlers: {
    handleEmotionSelect: (id: number) => void;
    handleGenreSelect: (id: number) => void;
    handleImdbRatingSelect: (rating: string) => void;
    handleYearRangeSelect: (range: number[]) => void;
  };
  onSearch: () => void;
}
export interface SearchMediaParams {
  keyword?: string;
  category?: string;
  genres?: number[];
  emotions?: number[];
  people?: string;
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

export interface CategoriesButtonProps {
  categories: Category[];
  selectedCategory: number | null;
  onCategorySelect: (id: number) => void;
}

export interface EmojiChartProps {
  border?: boolean;
  className?: string;
  media?: Partial<MediaItem>;
}

export interface RateMovieProps {
  emotions?: Emotion[];
  rows?: number;
  showConfirm?: boolean;
  cursorPointer?: boolean;
  className?: string;
  collectionId: string;
}

export interface EmotionButtonProps {
  svg: string;
  label: string;
  onClick: () => void;
  cursorPointer?: boolean;
  isSelected?: boolean; 
}

export interface VoteEmotionRequest {
  collection_id: string ;
  emotion_id: number;
  user_id: number;
}

export interface VoteEmotionResponse {
  success: boolean;
  message: string;
  data?: any;
}

export interface RegistrationFormProps {
  onRegistrationSuccess?: () => void;
}

export interface BioEditorProps {
  bio: string;
  onBioUpdate?: (newBio: string) => void;
  disabled?: boolean;
}

export interface User {
  data: {
    user: {
      name: string;
      email: string;
      bio?: string;
    };
    follow_stats: {
      followers_count: number;
      following_count: number;
    };
  };
}

export interface UserProfileProps {
  user: User;
}

export interface UserStatsProps {
  followStats: {
    followers_count: number;
    following_count: number;
  };
}

export interface UserSettingsProps {
  user: User;
  currentBio: string;
  onBioUpdate: (newBio: string) => void;
}

export interface UserAdminInfoProps {
  user: User;
}

export interface PersonData {
  id: number;
  name: string;
  surname: string;
  full_name: string;
  profession: string;
  image_path: string | null;
}

export interface MovieData {
  id: string;
  title_en: string;
  cover_path: string;
  imdb_rank: number;
  genres_names: string | string[];
  description: string;
  directors_data: PersonData[];
  writers_data: PersonData[];
  actors_data: PersonData[];
}

export interface MediaProps {
  movie: MovieData;
}

export interface MoviePosterProps {
  coverPath: string;
  title: string;
  movieId: string;
}

export interface MovieRatingProps {
  imdbRank: number;
  emotions?: Emotion[];
}

export interface GenreListProps {
  genres: string | string[] | undefined;
}

export interface PersonListProps {
  people: PersonData[];
  title: string;
}

export interface MovieDetailsProps {
  movie: MediaItem;
  emotions?: Emotion[];
}