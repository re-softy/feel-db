import { SearchMediaParams } from "@/types/types";

export default function parseSearchParams(searchParams: Record<string, string | string[] | undefined>): SearchMediaParams {
  return {
    keyword: typeof searchParams.keyword === 'string' ? searchParams.keyword : '',
    category: typeof searchParams.category === 'string' ? searchParams.category : '',
    genres: Array.isArray(searchParams.genre) 
      ? searchParams.genre.map(Number)
      : typeof searchParams.genre === 'string' 
        ? [Number(searchParams.genre)] 
        : [],
    emotions: Array.isArray(searchParams.emotions) 
      ? searchParams.emotions.map(Number)
      : typeof searchParams.emotions === 'string' 
        ? [Number(searchParams.emotions)] 
        : [],
    imdb_min: typeof searchParams.imdb_min === 'string' ? Number(searchParams.imdb_min) : null,
    year_min: typeof searchParams.year_min === 'string' ? Number(searchParams.year_min) : null,
    year_max: typeof searchParams.year_max === 'string' ? Number(searchParams.year_max) : null,
    page: typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1,
    per_page: typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 20
  };
}