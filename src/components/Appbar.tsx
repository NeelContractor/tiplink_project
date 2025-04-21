"use client";

import { signIn, signOut, useSession } from "next-auth/react"
import { PrimaryButton } from "./Button";
import Image from "next/image";

export default function() {
    const session = useSession();
    return (
        <div className="flex justify-between px-4 py-3">
            <div className="flex justify-center">
                <div>
                    <Image src={"/tiplinkLogo.svg"} alt={"TipLink Logo"} height={80} width={130} className="h-[30px] w-[99px] cursor-pointer sm:h-[40px] sm:w-[132px] css-0" />
                </div>
                <div className="flex justify-between items-center gap-6 pl-10">
                    <div className="text-lg font-medium text-gray-500">Products</div>
                    <div className="text-lg font-medium text-gray-500">API & Docs</div>
                    <div className="text-lg font-medium text-gray-500">FAQ</div>
                </div>

            </div>
            <div>{session.data?.user ? <PrimaryButton onClick={() => {
                signOut()
            }} >Logout</PrimaryButton> : <PrimaryButton onClick={() => {
                signIn()
            }} >SignIn</PrimaryButton>}</div>
        </div>
    )
}

// h-[30px] w-[99px] cursor-pointer sm:h-[40px] sm:w-[132px] css-0