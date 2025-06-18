import Image from 'next/image';

import EditIcon from '@mui/icons-material/Edit';

import Avatar2 from "@/components/assets/Avatar2.png";
import { UserProfileProps } from '@/types/types';

function UserProfile({ user }: UserProfileProps) {
    return (
        <div className="flex items-center gap-x-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden">
                <Image src={Avatar2} alt='Avatar' layout="responsive" width={240} height={240} className="rounded-full" />
            </div>
            <div className="flex items-center gap-x-4">
                <p className="md:text-xl lg:text-2xl font-regular tracking-wide">{user.data.user.name}</p>
                <EditIcon />
            </div>
        </div>
    );
}

export default UserProfile;