'use client'

import { createContext, useContext, useEffect, useState } from 'react';
import { getEmotions, getCategories, getGenres } from '@/lib/api';

interface FilterData {
  emotions: any[];
  categories: any[];
  genres: any[];
  loading: boolean;
}

const FilterDataContext = createContext<FilterData>({
  emotions: [],
  categories: [],
  genres: [],
  loading: true
});

export function FilterDataProvider({ children }: { children: React.ReactNode }) {
  const [filterData, setFilterData] = useState<FilterData>({
    emotions: [],
    categories: [],
    genres: [],
    loading: true
  });

  useEffect(() => {
    async function fetchFilterData() {
      try {
        const [emotionsResponse, categoriesResponse, genresResponse] = await Promise.all([
          getEmotions(),
          getCategories(),
          getGenres()
        ]);

        setFilterData({
          emotions: emotionsResponse?.emotions || [],
          categories: categoriesResponse?.data || [],
          genres: genresResponse?.data || [],
          loading: false
        });
      } catch (error) {
        console.error("Error fetching filter data:", error);
        setFilterData(prev => ({ ...prev, loading: false }));
      }
    }

    fetchFilterData();
  }, []);

  return (
    <FilterDataContext.Provider value={filterData}>
      {children}
    </FilterDataContext.Provider>
  );
}

export const useFilterData = () => useContext(FilterDataContext); 