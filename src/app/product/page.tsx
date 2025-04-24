"use client"
import Appbar from "@/components/Appbar"
import Footer from "@/components/Footer"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function Product() {
    return <div className="">
        <div>
            <Appbar />
            <Hero />
            <Offering />
            <Footer />
        </div>
    </div>
}

function Hero() {
    return <div>
        <section className='text-[#007cbf]  grid place-content-center h-screen sticky top-0 rounded-tr-2xl rounded-tl-2xl overflow-hidden'>
                <div className='absolute bottom-0 left-0 right-0 top-0 '>
                    <div className='flex justify-center p-20'>
                    <Image src={'/tiplink_4.webp'} alt={'Tiplink Pic'} width={650} height={650} />
                    <div className=' justify-center content-center'>
                        <div className='flex pb-5'>
                        <div className='flex justify-center items-center outline-none rounded-2xl bg-sky-500 font-bold p-3'>
                            <span><Image src={"/wallet_icon.png"} alt="Wallet Image" width={100} height={100} className="size-4 pr-1" /></span>
                            TIPLINK WALLET
                        </div>
                        </div>
                        <h1 className='text-6xl font-bold pb-5'>The world&apos;s simplest wallet</h1>
                        <h3 className='text-xl pb-5'>Create or login to your secured TipLink wallet with just 2 clicks:</h3>
                        <button 
                            className='flex justify-between items-center font-bold rounded-2xl text-white bg-[#007cbf] py-2 px-5 hover:cursor-pointer'
                            onClick={() => {
                            signIn()
                            }}
                        > <Image src={'/google_logo.png'} alt={'Google'} width={30} height={30} className="rounded-lg bg-white mr-2 " /> Continue via Google</button>
                    </div>
                    </div>
                </div>
            </section>
        </div>
}

function Offering() {
    return <div className="grid justify-center items-center mobile:grid pb-10">
        <h1 className="flex justify-center items-center font-bold text-lg pb-5">Core wallet features</h1>
        <div className="flex justify-center gap-4">
            <div className="rounded-lg p-10 shadow">
                <div className="flex justify-center pb-4">
                    <Image src={"/send_icon.png"} alt={""} width={10} height={10} className="text-blue size-20 rounded-full shadow shadow-blue-400/50 p-2" />
                </div>
                <h1 className="flex justify-center font-bold text-xl"><span className="text-[#007cbf] pr-1">Send</span> crypto via a link</h1>
                <h3 className="flex justify-center text-xl text-gray-400">Send anyone money with a link</h3>
            </div>
            <div className="rounded-lg p-10 shadow">
                <div className="flex justify-center pb-4">
                    <Image src={"/swap_icon.png"} alt={""} width={10} height={10} className="size-20 rounded-full shadow p-2 " />
                </div>
                <h1 className="flex justify-center font-bold text-xl"><span className="text-[#007cbf] pr-1">Swap</span> seamlessly</h1>
                <h3 className="flex justify-center text-xl text-gray-400">Swap in as fast as a second with low fees</h3>
            </div>
        </div>
    </div>
}