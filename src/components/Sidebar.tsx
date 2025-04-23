"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"  
import { signOut, useSession } from "next-auth/react"
import DialogDemo from "./DialogDemo";

export default function Sidebar() {

    const session = useSession();

    return <div >
    <Sheet>
    <SheetTrigger className="flex rounded-lg bg-white items-center px-2 py-1 hover:cursor-pointer hover:bg-gray-300">
    {session.data?.user?.image && (<img src={session.data.user.image} width={30} height={30} className="rounded-full size-8" alt="User profile"/>)}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 items-center">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
    </SheetTrigger>
    <SheetContent>
        <SheetHeader>
        <SheetTitle><img src={"/tiplinkLogo.svg"} width={100} height={70} /></SheetTitle>
        <SheetDescription asChild>
            <div className="flex justify-between items-center">
                <div>
                    {session.data?.user?.image && (
                        <img src={session.data.user.image} width={30} height={30} 
                            className="rounded-full size-15" alt="User profile"
                            />)}
                </div>
                <div className="grid itmes-start">
                    <div className="text-lg font-bold text-black">{session.data?.user?.name}</div>
                    <div className="text-black">{session.data?.user?.email}</div>
                </div>
                <button className="hover:cursor-pointer">
                    <img src={"/setting_icon.png"} width={25} height={25}  />
                </button>
            </div>
        </SheetDescription>
        <SheetDescription>
            {/* <div className="flex border-1 rounded-lg p-1 text-lg text-black justify-center items-center">Wallet Address</div> */}
            <DialogDemo /> 
        </SheetDescription>
        <SheetDescription asChild>
            <div className="flex justify-center gap-4 h-full w-full border-1 p-3 rounded-lg hover:font-bold hover:bg-gray-100">
                <img src={"/exit_icon.png"} height={20} width={20} />
                <button onClick={() => {
                    signOut({ callbackUrl: "/" })
                }}>Log Out</button>
            </div>
        </SheetDescription>
        </SheetHeader>
    </SheetContent>
    </Sheet>
</div>
}