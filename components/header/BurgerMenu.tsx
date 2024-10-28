import MenuIcon from "@/components/assets/MenuIcon.svg";

import Image from "next/image";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"


function BurgerMenu() {
    return (
        <div className='flex md:hidden'>
            <Sheet>
                <SheetTrigger>
                    <Image src={MenuIcon} alt="Menu Icon" width={24} height={24} className="w-8 h-8 cursor-pointer" />
                </SheetTrigger>
                <SheetContent>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default BurgerMenu;