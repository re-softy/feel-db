'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUserVotingHistoryAction } from '@/lib/actions/emotions-actions';

interface EmotionsContextType {
  totalItems: number;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const EmotionsContext = createContext<EmotionsContextType | undefined>(undefined);

export function EmotionsProvider({ children }: { children: React.ReactNode }) {
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getUserVotingHistoryAction(1, 1);
      if (result.success) {
        setTotalItems(result.pagination.total);
      } else {
        setTotalItems(0);
      }
    } catch {
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <EmotionsContext.Provider value={{ totalItems, isLoading, refresh: fetchStats }}>
      {children}
    </EmotionsContext.Provider>
  );
}

export function useEmotions() {
  const context = useContext(EmotionsContext);
  if (!context) {
    throw new Error('useEmotions must be used within EmotionsProvider');
  }
  return context;
}