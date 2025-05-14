import Banner from "@/components/banner/Banner";
import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";
import { fetchUserData } from "@/lib/api";
import { PageProps, PaginatedResponse } from "@/types/types";
import { redirect } from "next/navigation";

async function FavoritesPage({ searchParams }: PageProps) {
  // Get user data which should include favorites
  const userData = await fetchUserData();
  
  // If user is not logged in, redirect to login or show a message
  if (!userData) {
    // You might want to redirect to login page instead
    return (
      <DashboardLayout>
        <main className="w-[90%] md:w-[85%] flex flex-col mx-auto my-4 gap-y-4">
          <h1 className="text-3xl font-medium">Favorites</h1>
          <Banner />
          <div className="flex flex-col items-center justify-center py-12">
            <h2 className="text-xl mb-4">Please sign in to view your favorites</h2>
            <a href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-md">
              Sign In
            </a>
          </div>
        </main>
      </DashboardLayout>
    );
  }

  // Get favorites from user data
  const favorites = userData.favorites || [];
  
  // Format the data for AllContent component
  const paginatedData: PaginatedResponse = {
    current_page: 1,
    total: favorites.length,
    per_page: favorites.length,
    last_page: 1,
    hasNextPage: false,
    data: favorites
  };

  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] flex flex-col mx-auto my-4 gap-y-4">
        <h1 className="text-3xl font-medium">Your Favorites</h1>
        <Banner />
        {favorites.length > 0 ? (
          <AllContent mediaItems={paginatedData} />
        ) : (
          <div className="text-center py-12">
            <p className="text-xl">You haven&apos;t added any favorites yet.</p>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

export default FavoritesPage; 