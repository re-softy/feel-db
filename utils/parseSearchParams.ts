import { SearchMediaParams } from "@/types/types";

export default function parseSearchParams(searchParams: Record<string, string | string[] | undefined>): SearchMediaParams {
  const parseNumericArray = (param: string | string[] | undefined): number[] => {
    if (Array.isArray(param)) {
      return param.map(Number).filter(n => !isNaN(n));
    }
    if (typeof param === 'string') {
      return param.split(',').map(Number).filter(n => !isNaN(n));
    }
    return [];
  };

  const emotions = searchParams['emotion'] ?? searchParams.emotions;
  const genres = searchParams['genre[]'] ?? searchParams.genre;

  const result = {
    keyword: typeof searchParams.keyword === 'string' ? searchParams.keyword : '',
    category: typeof searchParams.category === 'string' ? searchParams.category : '',
    people: typeof searchParams.people === 'string' ? searchParams.people : '',
    genres: parseNumericArray(genres),
    emotions: parseNumericArray(emotions),
    imdb_min: typeof searchParams.imdb_min === 'string' ? Number(searchParams.imdb_min) : null,
    year_min: typeof searchParams.year_min === 'string' ? Number(searchParams.year_min) : null,
    year_max: typeof searchParams.year_max === 'string' ? Number(searchParams.year_max) : null,
    page: typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1,
    per_page: typeof searchParams.per_page === 'string' ? parseInt(searchParams.per_page) : 20
  };
  return result;
}