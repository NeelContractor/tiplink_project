import Image from "next/image"

export default function Page() {
    return <div className="bg-[#f0f8ff]">
        <div className="p-5">
            <a href="/">
                <Image src={"/tiplinkLogo.svg"} alt={"TipLink Logo"} height={80} width={130} className="h-[30px] w-[99px] cursor-pointer sm:h-[40px] sm:w-[132px] css-0" />
            </a>
        </div>
        <div className="grid justify-center bg-[#007cbf] py-10 ">
            <h1 className="font-bold text-6xl  text-white">TipLink Docs</h1>
            <h1 className="text-center text-white text-2xl pt-10">Links that are money</h1>
        </div>
        <Offering />
    </div>
}

function Offering() {
    return <div className="flex grid-cols-3 justify-center py-30 px-10 gap-4 mobile:grid ">
        <div className="grid justify-center items-center p-2 rounded-lg shadow">
            <div className="flex justify-center">
                <img src={"/send_money.png"} />
            </div>
            <h1 className="flex justify-center font-bold text-lg">Create a TipLink</h1>
            <h3 className="flex justify-center overflow-hidden text-ellipsis text-center">It's like buying a gift card, connect your crypto <br />wallet of choice and create a TipLink by depositing <br />how much you want to send.</h3>
        </div>
        <div className="grid justify-center items-center p-2 rounded-lg shadow">
            <div className="flex justify-center">
                <img src={"/share_icon.png"}  />
            </div>
            <h1 className="flex justify-center font-bold text-lg">Share your TipLink</h1>
            <h3 className="flex justify-center overflow-hidden text-ellipsis text-center">Copy the TipLink URL and send it to anyone, or <br />simply show them the QR code.</h3>
        </div>
        <div className="grid justify-center items-center p-2 rounded-lg shadow">
            <div className="flex justify-center">
                <img src={"/gift_icon.png"} />
            </div>
            <h1 className="flex justify-center font-bold text-lg">That's it</h1>
            <h3 className="flex justify-center overflow-hidden text-ellipsis text-center">You have just sent someone crypto and they can <br />send or use it even if they don't have a crypto<br /> wallet.</h3>
        </div>
    </div>
}