import Banner from "@/components/banner/Banner";
import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";
import { fetchUserFavorites } from "@/lib/api";
import { cookies } from "next/headers";

async function FavoritesPage() {
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth_token')?.value;

  const favoritesData = await fetchUserFavorites(authToken);

  const favorites = favoritesData?.data?.data || [];
  
  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] flex flex-col mx-auto my-4 gap-y-4">
        <h1 className="text-3xl font-medium">Your Favorites</h1>
        <Banner />
        {favorites.length > 0 ? (
          <AllContent mediaItems={favorites} />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl">You haven&apos;t added any favorites yet.</p>
            <p className="text-md mt-2 text-gray-600">Start browsing and add movies to your favorites!</p>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

export default FavoritesPage; 