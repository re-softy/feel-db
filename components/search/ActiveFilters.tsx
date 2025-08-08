'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { X, Filter } from 'lucide-react';
import { useFilterData } from '@/contexts/FilterDataContext';

interface ActiveFiltersProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default function ActiveFilters({ searchParams }: ActiveFiltersProps) {
  const router = useRouter();
  const currentSearchParams = useSearchParams();
  const { emotions, categories, genres, loading } = useFilterData();

  const getActiveFilters = () => {
    const filters: Array<{ key: string; label: string; value: string; type: string }> = [];

    const keyword = searchParams.keyword;
    if (keyword && typeof keyword === 'string' && keyword.trim()) {
      filters.push({ key: 'keyword', label: 'Keyword', value: keyword, type: 'keyword' });
    }

    const category = searchParams.category;
    if (category && typeof category === 'string' && category.trim()) {
      const categoryData = categories.find((cat: any) => cat.name === category);
      filters.push({ 
        key: 'category', 
        label: 'Category', 
        value: categoryData?.name || category,
        type: 'category'
      });
    }
 
    const people = searchParams.people;
    if (people && typeof people === 'string' && people.trim()) {
      filters.push({ key: 'people', label: 'People', value: people, type: 'people' });
    }

    const emotionsParam = searchParams.emotion || searchParams.emotions;
    if (emotionsParam) {
      const emotionIds = Array.isArray(emotionsParam) ? emotionsParam : [emotionsParam];
      emotionIds.forEach((emotionId) => {
        if (emotionId && typeof emotionId === 'string') {
          const emotionData = emotions.find((emotion: any) => emotion.id === parseInt(emotionId));
          if (emotionData) {
            filters.push({ 
              key: `emotion-${emotionId}`, 
              label: 'Emotion', 
              value: emotionData.name,
              type: 'emotion'
            });
          }
        }
      });
    }

    const genresParam = searchParams.genre || searchParams['genre[]'];
    if (genresParam) {
      const genreIds = Array.isArray(genresParam) ? genresParam : [genresParam];
      genreIds.forEach((genreId) => {
        if (genreId && typeof genreId === 'string') {
          const genreData = genres.find((genre: any) => genre.id === parseInt(genreId));
          if (genreData) {
            filters.push({ 
              key: `genre-${genreId}`, 
              label: 'Genre', 
              value: genreData.genre || genreData.name,
              type: 'genre'
            });
          }
        }
      });
    }

    const imdbMin = searchParams.imdb_min;
    if (imdbMin && typeof imdbMin === 'string' && imdbMin.trim()) {
      filters.push({ 
        key: 'imdb_min', 
        label: 'IMDB Rating', 
        value: `${imdbMin}+`,
        type: 'rating'
      });
    }

    const yearMin = searchParams.year_min;
    const yearMax = searchParams.year_max;
    if (yearMin && typeof yearMin === 'string' && yearMin.trim()) {
      filters.push({ 
        key: 'year_min', 
        label: 'Year From', 
        value: yearMin,
        type: 'year'
      });
    }
    if (yearMax && typeof yearMax === 'string' && yearMax.trim()) {
      filters.push({ 
        key: 'year_max', 
        label: 'Year To', 
        value: yearMax,
        type: 'year'
      });
    }

    return filters;
  };

  const removeFilter = (filterKey: string) => {
    const newSearchParams = new URLSearchParams(currentSearchParams.toString());
    
    if (filterKey.startsWith('emotion-')) {
      const emotionId = filterKey.replace('emotion-', '');
      const currentEmotions = newSearchParams.getAll('emotion');
      const filteredEmotions = currentEmotions.filter(id => id !== emotionId);
      newSearchParams.delete('emotion');
      filteredEmotions.forEach(id => newSearchParams.append('emotion', id));
    } else if (filterKey.startsWith('genre-')) {
      const genreId = filterKey.replace('genre-', '');
      const currentGenres = newSearchParams.getAll('genre');
      const filteredGenres = currentGenres.filter(id => id !== genreId);
      newSearchParams.delete('genre');
      filteredGenres.forEach(id => newSearchParams.append('genre', id));
    } else {
      newSearchParams.delete(filterKey);
    }

    const newUrl = newSearchParams.toString() ? `/search?${newSearchParams.toString()}` : '/search';
    router.push(newUrl);
  };

  const clearAllFilters = () => {
    router.push('/search');
  };

  const activeFilters = getActiveFilters();

  if (loading || activeFilters.length === 0) {
    return null;
  }

  const getFilterTypeColor = (type: string) => {
    switch (type) {
      case 'keyword':
        return 'bg-blue-600 border-blue-500';
      case 'category':
        return 'bg-purple-600 border-purple-500';
      case 'people':
        return 'bg-green-600 border-green-500';
      case 'emotion':
        return 'bg-orange-600 border-orange-500';
      case 'genre':
        return 'bg-pink-600 border-pink-500';
      case 'rating':
        return 'bg-yellow-600 border-yellow-500';
      case 'year':
        return 'bg-indigo-600 border-indigo-500';
      default:
        return 'bg-gray-600 border-gray-500';
    }
  };

  return (
    <div className="mb-6 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-orange" />
          <h3 className="text-lg font-medium text-white">Active Filters</h3>
          <span className="text-sm text-gray-400">({activeFilters.length})</span>
        </div>
        {activeFilters.length > 1 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-orange hover:brightness-110 underline"
          >
            Clear All
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter) => (
          <div
            key={filter.key}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border ${getFilterTypeColor(filter.type)}`}
          >
            <span className="text-white font-medium">{filter.label}:</span>
            <span className="text-white">{filter.value}</span>
            <button
              onClick={() => removeFilter(filter.key)}
              className="text-white hover:text-gray-200 transition-colors ml-1"
              aria-label={`Remove ${filter.label} filter`}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 