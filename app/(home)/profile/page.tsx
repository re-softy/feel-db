import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { fetchUserData } from "@/lib/api";

import DashboardLayout from "../DashboardLayout";
import UsersFavorite from "@/components/profile/UsersDashboard";
import UserAdminInfo from "@/components/profile/UserAdminInfo";

export default async function ProfilePage() {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token')?.value;
    if (!authToken) {
        redirect("/");
    }

    const user = await fetchUserData(authToken);

    if (!user) {
        return (
            <DashboardLayout>
                <main className="w-[86%] flex flex-col mx-auto px-[1vw] py-8">
                    <p className="text-xl text-center">Unable to load user profile. Your session may have expired.</p>
                    <p className="text-center mt-4">
                        <a href="/" className="text-orange underline">Please sign in again</a>
                    </p>
                </main>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <main className="w-[86%] flex flex-col mx-auto px-[1vw]">
                {/* <UserAdminInfo user={user} /> */}
                <UsersFavorite />
            </main>
        </DashboardLayout>
    );
}