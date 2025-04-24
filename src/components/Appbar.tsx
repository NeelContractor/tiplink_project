"use client";

import { signIn, signOut, useSession } from "next-auth/react"
import { PrimaryButton } from "./Button";
import Image from "next/image";
import Link from "next/link";

export default function Appbar() {
    const session = useSession();
    return (
        <div className="flex justify-between px-4 py-3">
            <div className="flex justify-center">
                <Link href="/">
                    <Image src={"/tiplinkLogo.svg"} alt={"TipLink Logo"} height={80} width={130} className="h-[30px] w-[99px] cursor-pointer sm:h-[40px] sm:w-[132px] css-0" />
                </Link>
                <div className="flex justify-between items-center gap-6 pl-10">
                    <a href="/product" className="text-lg font-medium text-gray-500">Products</a>
                    <a href="/docs" className="text-lg font-medium text-gray-500">API & Docs</a>
                    <a href="/faq" className="text-lg font-medium text-gray-500">FAQ</a>
                </div>

            </div>
            <div>{session.data?.user ? <PrimaryButton onClick={() => {
                signOut()
            }} >Logout</PrimaryButton> : <PrimaryButton onClick={() => {
                signIn("google", { callbackUrl: "/dashboard" })
            }} >SignIn</PrimaryButton>}</div>
        </div>
    )
}

// h-[30px] w-[99px] cursor-pointer sm:h-[40px] sm:w-[132px] css-0