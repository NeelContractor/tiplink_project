import { authConfig } from "@/lib/auth";
import { Keypair } from "@solana/web3.js";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import db from "../../../db/index"
import bs58 from "bs58";

export async function GET() {
    const session = await getServerSession(authConfig);
    console.log(session)
    if (!session?.user) {
        return NextResponse.json({
            message: "You are not logged in"
        }, {
            status: 401
        })
    }

    const solWallet = await db.solWallet.findFirst({
        where: {
            userId: session.user.uid
        }
    })

    if (!solWallet) {
        return NextResponse.json({
            message: "Couldn't find associated solana wallet"
        }, {
            status: 401
        })
    }

    const privateKey = getPrivateKeyFromDb(solWallet.privateKey).secretKey;
    const bytes = Uint8Array.from(privateKey)
    const address = bs58.encode(bytes)
    console.log("address from be keys :", address);

    return NextResponse.json({
        address
    })
}
function getPrivateKeyFromDb(privateKey: string) {
    const arr = privateKey.split(",").map(x => Number(x));
    const privateKeyUintArr = Uint8Array.from(arr);
    const keypair = Keypair.fromSecretKey(privateKeyUintArr);
    return keypair;
}