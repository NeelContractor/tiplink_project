"use client"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"  
import DialogDemo from "../components/DialogDemo";
import WalletTabPage from "./WalletTabPage";
import AppTabPage from "./AppTabPage";

enum Tabs { 
    WalletTab,  
    AppTab 
};

export default function WalletAppbar({ publicKey }: {
    publicKey: string
}) {
    const [activeTab, setActiveTab] = useState<Tabs>(Tabs.WalletTab);
    const session = useSession();
    

    return (
        <div className="grid bg-[#f0f8ff]">
            <div className="flex justify-between px-4 py-3 bg-[#f0f8ff]">
                <div className="flex justify-center">
                    <Image src={"/tiplinkLogo.svg"} alt={"TipLink Logo"} height={80} width={130} className="h-[30px] w-[99px] cursor-pointer sm:h-[40px] sm:w-[132px] css-0" />
                </div>
                <div className="flex justify-center items-center rounded-full bg-white gap-5">
                    <button 
                        onClick={() => {
                            setActiveTab(Tabs.WalletTab)
                        }}
                        className="flex justify-center items-center py-2 px-10 font-bold hover:cursor-pointer hover:bg-[#2d4c5d] hover:text-white rounded-full "
                        >Wallet</button>
                    <button
                        onClick={() => {
                            setActiveTab(Tabs.AppTab)
                        }}
                        className="flex justify-center items-center py-2 px-10 font-bold hover:cursor-pointer hover:bg-[#2d4c5d] hover:text-white rounded-full "
                        >App</button>
                </div>
                <div >
                    <Sheet>
                    <SheetTrigger className="flex rounded-lg bg-white items-center px-2 py-1 hover:cursor-pointer hover:bg-gray-300">
                    {session.data?.user?.image && (<Image src={session.data.user.image} width={30} height={30} className="rounded-full size-8" alt="User profile"/>)}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 items-center">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                        </svg>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                        <SheetTitle><Image src={"/tiplinkLogo.svg"} alt="TipLink Logo" width={100} height={70} /></SheetTitle>
                        <SheetDescription asChild>
                            <div className="flex justify-between items-center">
                                <div>
                                    {session.data?.user?.image && (
                                        <Image src={session.data.user.image} width={30} height={30} 
                                            className="rounded-full size-15" alt="User profile"
                                            />)}
                                </div>
                                <div className="grid itmes-start">
                                    <div className="text-lg font-bold text-black">{session.data?.user?.name}</div>
                                    <div className="text-black">{session.data?.user?.email}</div>
                                </div>
                                <button className="hover:cursor-pointer">
                                    <Image src={"/setting_icon.png"} alt="Setting" width={25} height={25}  />
                                </button>
                            </div>
                        </SheetDescription>
                        <SheetDescription>
                            <DialogDemo /> 
                        </SheetDescription>
                        <SheetDescription asChild>
                            <div className="flex justify-center gap-4 h-full w-full border-1 p-3 rounded-lg hover:font-bold hover:bg-gray-100">
                                 <Image src={"/exit_icon.png"} alt="Exit" height={20} width={20} />
                                <button onClick={() => {
                                    signOut({ callbackUrl: "/" })
                                }}>Log Out</button>
                            </div>
                        </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                    </Sheet>
                </div>
            </div>
            <div className="flex justify-center items-center my-20 mobile:px-4 lg:px-8 css-0 bg-[#f0f8ff]">
                {activeTab == Tabs.WalletTab ? <WalletTabPage publicKey={publicKey} /> : <AppTabPage />}
            </div>
        </div>
    )
}
