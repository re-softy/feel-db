"use client";

import MediaList from "@/components/media/MediaList";
import MediaCarousel from "@/components/media/MediaCarousel";
import { useFavorites } from "@/contexts/FavoritesContext";

interface FavoritesSectionProps {
  isAuthenticated: boolean;
}

function FavoritesSection({ isAuthenticated }: FavoritesSectionProps) {
  const { favorites } = useFavorites();
  const hasFavorites = favorites.length > 0;

  if (!isAuthenticated || !hasFavorites) {
    return null;
  }

  return (
    <MediaList title="Favorites" linkHref="/favorites" linkText="See All">
      <MediaCarousel mediaItems={favorites} baseLinkHref="/favorites" />
    </MediaList>
  );
}

export default FavoritesSection; 