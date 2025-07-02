import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import Avatar2 from "@/components/assets/Avatar2.png";
import { UserProfileProps } from '@/types/types';

function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="flex flex-row flex-wrap md:flex-nowrap items-start md:items-center gap-4 md:gap-10">
      <div className="w-full md:w-auto order-1 md:order-2 flex items-start gap-x-2">
        <p className="md:text-xl lg:text-2xl font-regular tracking-wide">
          {user.data.user.name}
        </p>
        <EditIcon fontSize="small" />
      </div>

      <div className="flex-none w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 order-2 md:order-1 rounded-full overflow-hidden">
        <Image
          src={Avatar2}
          alt="Avatar"
          layout="responsive"
          width={240}
          height={240}
          className="rounded-full"
        />
      </div>

      <div className="flex-1 md:w-auto order-3 md:order-3 flex self-center items-center justify-center gap-x-6">
        <div className="flex flex-col items-center">
          <span className="text-md lg:text-lg">
            {user.data.follow_stats.followers_count}
          </span>
          <span className="text-sm lg:text-lg">followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-md lg:text-lg">
            {user.data.follow_stats.following_count}
          </span>
          <span className="text-sm lg:text-lg">following</span>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;