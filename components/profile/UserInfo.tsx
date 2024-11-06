import Avatar2 from "@/components/assets/Avatar2.png";
import Image from "next/image";

import AddIcon from '@mui/icons-material/Add';

function UserInfo() {
    return (
        <section>
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-center sm:justify-around md:justify-between">
                    <div className="flex items-center gap-8">
                        <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 rounded-full overflow-hidden">
                            <Image src={Avatar2} alt='Avatar' layout="responsive" width={240} height={240} className="rounded-full" />
                        </div>
                        <div className="hidden md:flex flex-col gap-3">
                            <p className="md:text-xl lg:text-2xl font-medium tracking-wide">Dali Khukhunashvili</p>
                            <span className="md:text-sm lg:text-md text-[#CBC9C9]">Followed by dadu daduka and +20 others</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-4 px-6">
                        <div className="flex items-center justify-center gap-10">
                            <div className="flex flex-col items-center">
                                <span className="text-md lg:text-lg">121</span>
                                <span className="text-sm lg:text-lg">followers</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-md lg:text-lg">121</span>
                                <span className="text-sm lg:text-lg">following</span>
                            </div>
                        </div>
                        <button className="flex items-center gap-1 border-2 border-orange rounded-full py-1 px-10 text-sm md:text-md lg:text-lg">
                            <AddIcon fontSize="medium" />Follow
                        </button>
                    </div>
                </div>
                <p className="text-sm lg:text-lg mx-2 font-normal">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, distinctio tempora aperiam tenetur culpa aut repudiandae quam laudantium ab beatae. Impedit molestiae, neque doloribus inventore labore quasi hic consequuntur harum!
                </p>
            </div>
        </section>
    )
}

export default UserInfo;
