import { cookies } from "next/headers";

import { fetchUserData } from "@/lib/api";

import DashboardLayout from "../DashboardLayout";
import UsersEmotion from "@/components/profile/UsersEmotion";
import UsersFavorite from "@/components/profile/UsersFavorite";
import UserAdminInfo from "@/components/profile/UserAdminInfo";

export default async function ProfilePage() {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token')?.value;

    const user = await fetchUserData(authToken);

    if (!user) {
        return (
            <DashboardLayout>
                <main className="w-[86%] flex flex-col mx-auto px-[1vw] py-8">
                    <p className="text-xl text-center">Could not load user profile. Please try logging in again or contact support if the issue persists.</p>
                </main>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <main className="w-[86%] flex flex-col mx-auto px-[1vw]">
                <UserAdminInfo user={user} />
                <UsersEmotion />
                <UsersFavorite />
            </main>
        </DashboardLayout>
    );
}