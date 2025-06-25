import { SearchMediaParams } from "@/types/types";

export default function parseSearchParams(searchParams: Record<string, string | string[] | undefined>): SearchMediaParams {
  const parseNumericArray = (param: string | string[] | undefined): number[] => {
    if (Array.isArray(param)) {
      return param.map(Number).filter(n => !isNaN(n) && n > 0);
    }
    if (typeof param === 'string' && param.trim()) {
      return param.split(',').map(Number).filter(n => !isNaN(n) && n > 0);
    }
    return [];
  };

  const parseStringParam = (param: string | string[] | undefined): string => {
    if (typeof param === 'string') {
      return param.trim();
    }
    if (Array.isArray(param) && param.length > 0) {
      return param[0].trim();
    }
    return '';
  };

  const parseNumberParam = (param: string | string[] | undefined): number | null => {
    const stringValue = parseStringParam(param);
    if (!stringValue) return null;
    
    const numValue = Number(stringValue);
    return isNaN(numValue) ? null : numValue;
  };

  const emotions = searchParams['emotion'] ?? searchParams.emotions;
  const genres = searchParams['genre[]'] ?? searchParams.genre;

  const result: SearchMediaParams = {
    keyword: parseStringParam(searchParams.keyword),
    category: parseStringParam(searchParams.category),
    people: parseStringParam(searchParams.people),
    genres: parseNumericArray(genres),
    emotions: parseNumericArray(emotions),
    imdb_min: parseNumberParam(searchParams.imdb_min),
    year_min: parseNumberParam(searchParams.year_min),
    year_max: parseNumberParam(searchParams.year_max),
    page: Math.max(1, parseNumberParam(searchParams.page) || 1),
    per_page: Math.max(1, Math.min(100, parseNumberParam(searchParams.per_page) || 20))
  };

  return result;
}