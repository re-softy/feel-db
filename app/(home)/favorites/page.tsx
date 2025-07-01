import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";
import { getUserFavoritesAction } from "@/lib/actions/favorites-actions";

export const dynamic = "force-dynamic";

async function FavoritesPage() {
  const favoritesData = await getUserFavoritesAction();
  const favorites = favoritesData?.data || [];
  
  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] flex flex-col mx-auto my-4 gap-y-4">
        <h1 className="text-3xl font-medium">Your Favorites</h1>
        {favorites.length > 0 ? (
          <AllContent mediaItems={favorites} />
        ) : (
          <div className="w-full h-[16vw] text-center flex flex-col items-center justify-center my-10">
            <p className="text-xl">You haven&apos;t added any favorites yet.</p>
            <p className="text-md mt-2 text-gray-600">Start browsing and add movies to your favorites!</p>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

export default FavoritesPage; 