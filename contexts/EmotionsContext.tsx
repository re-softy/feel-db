'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { MediaItem } from '@/types/types';
import { getUserVotingHistoryAction } from '@/lib/actions/emotions-actions';

interface EmotionsContextType {
  votingHistory: MediaItem[];
  isLoading: boolean;
  refreshVotingHistory: () => Promise<void>;
}

const EmotionsContext = createContext<EmotionsContextType | undefined>(undefined);

export function EmotionsProvider({ children }: { children: React.ReactNode }) {
  const [votingHistory, setVotingHistory] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVotingHistory = async () => {
    try {
      setIsLoading(true);

      const result = await getUserVotingHistoryAction();
      
      if (result.success) {
        setVotingHistory(result.data);
      } else {
        setVotingHistory([]);
      }
    } catch (error) {
      console.error('🔍 EmotionsContext: Error fetching voting history:', error);
      setVotingHistory([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVotingHistory();
  }, []);

  const refreshVotingHistory = async () => {
    await fetchVotingHistory();
  };

  return (
    <EmotionsContext.Provider
      value={{
        votingHistory,
        isLoading,
        refreshVotingHistory,
      }}
    >
      {children}
    </EmotionsContext.Provider>
  );
}

export function useEmotions() {
  const context = useContext(EmotionsContext);
  if (context === undefined) {
    throw new Error('useEmotions must be used within an EmotionsProvider');
  }
  return context;
} 