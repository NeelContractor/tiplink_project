
import { getServerSession } from "next-auth";
import { ProfileCard } from "../../components/ProfileCard";
import db from "../../db/index";
import { authConfig } from "../../lib/auth";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";

async function getUserWallet() {
    const session = await getServerSession(authConfig);

    const userWallet = await db.solWallet.findFirst({
        where: {
            userId: session?.user?.uid
        },
        select: {
            publicKey: true,
        }
    })

    if (!userWallet) {
        return {
            error: "No solana wallet found associated to the user"
        }
    }
    
    return {error: null, userWallet};
}

export default async function Dashboard() {
    const userWallet = await getUserWallet();

    if (userWallet.error || !userWallet.userWallet?.publicKey) {
        return <>No solana wallet found</>
    }

    return <div className="grid bg-[#f0f8ff]">
        <div className="flex justify-between px-4 py-3">
            <Image src={"/tiplinkLogo.svg"} alt={"TipLink Logo"}  height={80} width={130} className="h-[30px] w-[99px] cursor-pointer sm:h-[40px] sm:w-[132px] css-0" />
            <Sidebar />
        </div>
        <div className="">
            <ProfileCard publicKey={userWallet.userWallet?.publicKey} />
        </div>
    </div>
}