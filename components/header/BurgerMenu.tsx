import MenuIcon from "@/components/assets/MenuIcon.svg";
import LocaleSwitcher from "@/components/header/LocaleSwitcher";
import AuthButton from "@/components/header/AuthButton";

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
                    <Image src={MenuIcon} alt="Menu Icon" width={24} height={24} className="w-7 h-7 cursor-pointer" />
                </SheetTrigger>
                <SheetContent>
                    <div className="flex flex-col items-start gap-4">
                        <LocaleSwitcher />
                        <AuthButton />
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default BurgerMenu;