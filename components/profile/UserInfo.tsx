import Avatar2 from "@/components/assets/Avatar2.png";
import Image from "next/image";

import AddIcon from '@mui/icons-material/Add';

function UserInfo() {
    return (
        <section className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto">
            <div className="flex flex-col gap-8 p-6">
                <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <div>
                        <Image src={Avatar2} alt='Avatar' className="w-[160px] h-[160px] rounded-full" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="text-xl font-medium tracking-wide">Dali Khukhunashvili</p>
                        <span className="text-sm text-[#CBC9C9]"> Followed by dadu daduka and +20 others</span>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4 px-6">
                    <div className="flex items-center justify-center gap-10">
                        <div className="flex flex-col items-center">
                            <span>121</span>
                            <span className="text-sm">followers</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span>121</span>
                            <span className="text-sm">following</span>
                        </div>
                    </div>
                    <button className="flex items-center gap-1 border-2 border-orange-600 rounded-full py-1 px-10">
                    <AddIcon fontSize="small"/>follow</button>
                </div>
                </div>
                <p className="text-lg">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, distinctio tempora aperiam tenetur culpa aut repudiandae quam laudantium ab beatae. Impedit molestiae, neque doloribus inventore labore quasi hic consequuntur harum!</p>
            </div>
        </section>
    )
}

export default UserInfo;