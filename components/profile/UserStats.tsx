import { UserStatsProps } from "@/types/types";

function UserStats({ followStats }: UserStatsProps) {
    return (
        <div className="flex flex-col items-center mx-auto gap-4 px-6">
            <div className="flex items-center justify-center gap-10">
                <div className="flex flex-col items-center">
                    <span className="text-md lg:text-lg">{followStats.followers_count}</span>
                    <span className="text-sm lg:text-lg">followers</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-md lg:text-lg">{followStats.following_count}</span>
                    <span className="text-sm lg:text-lg">following</span>
                </div>
            </div>
        </div>
    );
}

export default UserStats;