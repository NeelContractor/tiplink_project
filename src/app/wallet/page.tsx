
import WalletAppbar from "@/components/WalletAppbar";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import db from "../../db/index"

async function getUserWallet() {
    const session = await getServerSession(authConfig);

    const userWallet = await db.solWallet.findFirst({
        where: {
            userId: session?.user?.uid
        },
        select: {
            publicKey: true
        }
    })

    if (!userWallet) {
        return {
            error: "No solana wallet found associated to the user"
        }
    }
    
    return {error: null, userWallet};
}

export default async function Wallet() {
    const userWallet = await getUserWallet();

    if (userWallet.error || !userWallet.userWallet?.publicKey) {
        return <>No solana wallet found</>
    }

    return (
        <div>
            <WalletAppbar publicKey={userWallet.userWallet.publicKey} />
        </div>
    )
}

