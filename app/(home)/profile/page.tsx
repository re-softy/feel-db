import UserInfo from "@/components/profile/UserInfo";
import DashboardLayout from "../DashboardLayout";
import UsersEmotion from "@/components/profile/UsersEmotion";
import UsersFavorite from "@/components/profile/UsersFavorite";

function ProfilePage() {
    return (
        <DashboardLayout>
            <main className="w-[86%] flex flex-col mx-auto px-[1vw]">
                <UserInfo />
                <UsersEmotion />
                <UsersFavorite />
            </main>
        </DashboardLayout>
    )
}

export default ProfilePage;