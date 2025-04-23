"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PrimaryButton, TabButton } from "./Button";
import { useEffect, useState } from "react";
import { TokenWithbalance, useTokens } from "../app/api/hooks/useTokens";
import { TokenList } from "./TokenList";
import { Swap } from "./Swap";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";

type Tab = "tokens" | "send" | "swap" // | "withdraw" | "add_funds" 
const tabs: {id: Tab; name: string}[] = [
    {id: "tokens", name: "Tokens"}, 
    {id: "send", name: "Send"}, 
    // {id: "add_funds", name: "Add funds"},
    // {id: "withdraw", name: "Withdraw"},
    {id: "swap", name: "Swap"},
];

export const ProfileCard = ({ publicKey }: {
    publicKey: string;
}) => {
    const session = useSession();
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<Tab>("tokens");
    const { tokenBalances, loading } = useTokens(publicKey);

    if (session.status === "loading") {
        // TODO: add skeleton
        return <div className="flex justify-center items-center text-gray-400 font-bold">
            Loading...
        </div>
    }

    if (!session.data?.user) {
        router.push("/")
        return null
    }

    return <div className="pt-8 flex justify-center">
    <div className="max-w-4xl bg-white rounded shadow w-full">
        <Greeting 
            image={session.data.user.image ?? ""} 
            name={session.data?.user?.name ?? ""} 
        />
        <div className="w-full flex px-10 rounded-b-lg">
            {tabs.map(tab => <TabButton key={tab.id} active={tab.id === selectedTab} onClick={() => {
                setSelectedTab(tab.id)
            }}>{tab.name}</TabButton>)}
        </div>
        
        <div className={`${selectedTab === "tokens" ? "visible" : "hidden"}`}><Assets tokenBalances={tokenBalances} loading={loading} publicKey={publicKey} /> </div>
        <div className={`${selectedTab === "swap" ? "visible" : "hidden"}`}><Swap tokenBalances={tokenBalances} publicKey={publicKey} /> </div>
        <div className={`${selectedTab === "send" ? "visible" : "hidden"}`}><Send /></div>
        {/* <div className={`${(selectedTab !== "swap" && selectedTab !== "tokens" ) ? "visible" : "hidden"}`}><Warning /> </div> */}
    </div> 
</div>
}

function Send() {
    const [receiverPubkey, setReceiverPubky] = useState<string>('');
    const [sendAmount, setSendAmount] = useState<number>(0);
    const [sign, setSign] = useState("");

    async function sendTokens() {
        await axios.post(`/api/send?receiver=${receiverPubkey}&amount=${sendAmount}`)
            .then((res) => {
                setSign(`https://explorer.solana.com/tx/${res.data.sign}?cluster=devnet`)
            })
    }

    return (
        <div className="grid gap-4 justify-center bg-gray-100 py-10">
            <div className="grid justify-center gap-4">
                <input 
                    placeholder="Recevier Public Key" 
                    type="text" 
                    value={receiverPubkey}
                    onChange={(e) => {
                        setReceiverPubky(e.target.value);
                    }} 
                    className="p-2 text-lg w-96 border rounded-lg outline-none"
                />
                <input 
                    placeholder="Amount to transfer" 
                    type="number" 
                    value={sendAmount}
                    onChange={(e) => {
                        setSendAmount(Number(e.target.value));
                    }} 
                    className="p-2 text-lg w-96 border rounded-lg outline-none"
                />
            </div>
            <div className="flex justify-center">
                <PrimaryButton children={"Send Tokens"} onClick={() => {
                    sendTokens()
                }} />
            </div>
            <div className="flex justify-center text-wrap">
                {sign ? <a href={sign} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Link</a> : null}
            </div>
            <div className="flex">
                <h6 className="flex justify-center text-sm text-gray-500">This send functionality will be implemented using the Devnet. <br />To send the token through Mainnet, we need Mainnet tokens, which we don't have.</h6>
            </div>
        </div>
    )
}

function Warning() {
    return <div className="bg-slate-50 py-32 px-10 flex justify-center">
        We dont yet support this feature
    </div>
}

function Assets({ publicKey, tokenBalances, loading }: {
    publicKey: string; 
    tokenBalances: {
        totalBalance: number,
        tokens: TokenWithbalance[]
    } | null; 
    loading: boolean
}) {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (copied) {
            let timeout = setTimeout(() => {
                setCopied(false)
            }, 3000)
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [copied])

    if (loading) {
        return <div className="flex justify-center py-20">
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
        
    }

    return <div className="text-slate-500 bg-gray-100">
    <div className="mx-12 py-2 text-gray-400 font-bold">
        TipLink Account assets
    </div>
    <div className="flex justify-between mx-12">
        <div className="flex">
            <div className="text-5xl font-bold text-black">
                ${tokenBalances?.totalBalance}
            </div>
            <div className="font-slate-500 font-bold text-3xl flex flex-col justify-end pb-0 pl-2">
                USD
            </div>
        </div>

        <div>
            <PrimaryButton onClick={() => {
                navigator.clipboard.writeText(publicKey)
                setCopied(true)
            }}>{copied ? "Copied" : "Your wallet address"}</PrimaryButton>
        </div>
    </div>

    <div className="pt-4 bg-gray-100 p-12 mt-4">
        <TokenList tokens={tokenBalances?.tokens || []} />
    </div>
</div>
}

function Greeting({
    image, name
}: {
    image: string, name: string
}) {
    return <div className="flex p-12">
    <img src={image} className="rounded-full w-16 h-16 mr-4" />
    <div className="text-2xl font-semibold flex flex-col justify-center">
       Welcome back, {name}
    </div>
</div>
}