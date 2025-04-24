"use client"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
    return <div className="">
        <div className="grid justify-center bg-[#007cbf] text-white gap-3 py-20">
            <h1 className="flex text-5xl font-bold ">Try it for yourself</h1>
            <h1 className="flex justify-center text-lg">Create and send crypto with TipLink!</h1>
            <div className="flex justify-center">
                <button 
                    className='flex justify-between items-center font-bold rounded-lg bg-white text-[#007cbf] py-4 px-5'
                    onClick={() => {
                    signIn()
                    }}
                > Create a Tiplink</button>
            </div>
        </div>
        <div className="flex justify-between py-20 px-20">
            <div className="grid justify-start">
                <Link href="/">
                    <Image src={"/tiplinkLogo.svg"} alt={"TipLink Logo"} width={100} height={100} />
                </Link>
                <Link href="https://github.com/NeelContractor/tiplink_project">
                    <Image src={"/github_logo.png"} alt={"Github Logo"} width={25} height={25} />
                </Link>
                <h1 className="text-gray-400">@2025 TipLink. All rights reserved.</h1>
            </div>
            <div className="flex gap-5">
                <div className="grid">
                    <h1 className="font-bold text-gray-500">Product & Docs</h1>
                    <Link href="/" className="text-gray-400">Create TipLink</Link>
                    <Link href="/docs" className="text-gray-400">Documentation</Link>
                </div>
                <div className="grid">
                    <h1 className="font-bold text-gray-500">Company</h1>
                    <Link href="/faq" className="text-gray-400">FAQ</Link>
                    <Link href="https://github.com/NeelContractor/tiplink_project">
                        <h3 className="text-gray-400">Github</h3>
                    </Link>
                </div>
            </div>
        </div>
    </div>
}