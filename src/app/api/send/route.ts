import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";
import db from "../../../db/index"
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

export async function POST(req: NextRequest) {
    const connection = new Connection("https://api.devnet.solana.com");
    const { searchParams } = new URL(req.url);
    const receiver = searchParams.get('receiver') as unknown as string;
    const amountToSend = searchParams.get('amount') as unknown as string;
    console.log("recevier on be: ", receiver);
    console.log("amount on be: ", amountToSend);

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
    
    const privateKey = getPrivateKeyFromDb(solWallet.privateKey)

    const transaction = new Transaction();
    transaction.add(SystemProgram.transfer({
        fromPubkey: new PublicKey(solWallet.publicKey),
        toPubkey: new PublicKey(receiver),
        lamports: Number(amountToSend) * LAMPORTS_PER_SOL,
    }));

    const sign = await connection.sendTransaction(transaction, [privateKey]);

    return NextResponse.json({
        sign
    })
}
function getPrivateKeyFromDb(privateKey: string) {
    const arr = privateKey.split(",").map(x => Number(x));
    const privateKeyUintArr = Uint8Array.from(arr);
    const keypair = Keypair.fromSecretKey(privateKeyUintArr);
    return keypair;
}