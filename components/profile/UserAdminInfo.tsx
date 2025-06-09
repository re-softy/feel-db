import Image from "next/image";
import Avatar2 from "@/components/assets/Avatar2.png";
import EditIcon from '@mui/icons-material/Edit';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';

async function UserAdminInfo({ user }: { user: any }) {
    return (
        <section>
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-x-6">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden">
                        <Image src={Avatar2} alt='Avatar' layout="responsive" width={240} height={240} className="rounded-full" />
                    </div>
                    <div className="flex items-center gap-x-4">
                        <p className="md:text-xl lg:text-2xl font-regular tracking-wide">{user.data.user.name}</p>
                        <EditIcon from="@mui/icons-material/Edit" />
                    </div>
                        <div className="flex flex-col items-center mx-auto gap-4 px-6">
                            <div className="flex items-center justify-center gap-10">
                                <div className="flex flex-col items-center">
                                    <span className="text-md lg:text-lg">{user.data.follow_stats.following_count}</span>
                                    <span className="text-sm lg:text-lg">followers</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-md lg:text-lg">{user.data.follow_stats.followers_count}</span>
                                    <span className="text-sm lg:text-lg">following</span>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className="flex flex-col items-start border-y border-grey my-10 py-6">
                <div className="flex items-center gap-x-10 p-4">
                    <EditIcon from="@mui/icons-material/Edit"/>
                    <p className="text-lg font-light">Edit Your Bio</p>
                    <p className='text-lg font-normal text-[#989898]'>{user.data.user.bio}</p>
                </div>
                <div className="flex items-center gap-x-10 p-4">
                    <MailOutlineIcon from="@mui/icons-material/MailOutline"/>
                    <p className="text-lg font-light">Edit Your Email</p>
                    <p className='text-lg font-normal text-[#989898]'>{user.data.user.email}</p>
                </div>
                <div className="flex items-center gap-x-10 p-4">
                    <KeyIcon from="@mui/icons-material/Key"/>
                    <p className="text-lg font-light">Change password</p>
                    <p className='text-lg font-normal text-[#989898]'>********</p>
                </div>
            </div>
        </section>
    );
}

export default UserAdminInfo;