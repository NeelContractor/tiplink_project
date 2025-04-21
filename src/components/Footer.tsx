"use client"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function() {
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
                <a href="/">
                    <Image src={"/tiplinkLogo.svg"} alt={"TipLink Logo"} width={100} height={100} />
                </a>
                {/* TODo add github repo link */}
                <a href="">
                    <Image src={"/github_logo.png"} alt={"Github Logo"} width={25} height={25} />
                </a>
                <h1 className="text-gray-400">@2025 TipLink. All rights reserved.</h1>
            </div>
            <div className="flex gap-5">
                <div className="grid">
                    <h1 className="font-bold text-gray-500">Product & Docs</h1>
                    <h3 className="text-gray-400">Create TipLink</h3>
                    <h3 className="text-gray-400">Documentation</h3>
                </div>
                <div className="grid">
                    <h1 className="font-bold text-gray-500">Company</h1>
                    <h3 className="text-gray-400">FAQ</h3>
                    <h3 className="text-gray-400">Github</h3>
                </div>
            </div>
        </div>
    </div>
}