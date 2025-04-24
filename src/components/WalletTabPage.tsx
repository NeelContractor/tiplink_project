"use client"
import { TokenWithbalance, useTokens } from "@/app/api/hooks/useTokens";
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PrimaryButton, TabButton } from "./Button";
import { TokenList } from "./TokenList";
import Image from "next/image";

type Tab = "tokens" | "send" | "add_fund" | "withdraw" | "swap"

const tabs: {id: Tab; name: string}[] = [
    {id: "tokens", name: "Tokens"},
    {id: "send", name: "Send"},
    {id: "add_fund", name: "Add Fund"},
    {id: "withdraw", name: "Withdraw"},
    {id: "swap", name: "Swap"},
]

export default function WalletTabPage({ publicKey }: {
    publicKey: string
}) {
    const session = useSession();
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState<Tab>("tokens");
    
    if (session.status === "loading") {
        // TODO: replace with a skeleton
        return <div>
            Loading...
        </div>
    }
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { tokenBalances, loading } = useTokens(publicKey);
    console.log("token balance: ", tokenBalances)
    console.log("userWallet: ", publicKey)

    if (!session.data?.user) {
        router.push("/");
    }

    return (
        <div className=" rounded-xl bg-white p-5 w-[60vw] h-[60vh] overflow-hidden  shadow-[0px_0px_40px_rgba(0,0,0,0.06)]  sm:p-8 sm:px-10 css-0">
            <div className="flex justify-start bg-white  gap-4">
                <Image src={session.data?.user?.image || ""} className="h-16 w-16 rounded-full" alt={"User Profile"} width={100} height={100} />
                <h1 className="flex justify-center items-center text-[#2d4c5d] text-2xl font-bold">Welcome back, {session.data?.user?.name}!</h1>
            </div>
            <div>
                <div className="text-gray-400 font-bold py-5">TipLink Account Assets</div>
                <div>{}</div>
                <div className="w-full flex px-10">
                    {tabs.map(tab => <TabButton key={tab.id} active={tab.id === selectedTab} onClick={() => {
                        setSelectedTab(tab.id)
                    }} >{tab.name}</TabButton>)}
                </div>

                <div className={`${selectedTab === "tokens" ? "visible" : "hidden"}`}><Assets tokenBalances={tokenBalances} loading={loading} publicKey={publicKey} /> </div>
                {/* <div className={`${selectedTab === "swap" ? "visible" : "hidden"}`}><Swap tokenBalances={tokenBalances} publicKey={publicKey} /> </div>
                <div className={`${(selectedTab !== "swap" && selectedTab !== "send") ? "visible" : "hidden"}`}><Warning /> </div> */}
            </div>
        </div>
    )
}


function Assets({publicKey, tokenBalances, loading}: {
    publicKey: string;
    tokenBalances: {
        totalBalance: number,
        tokens: TokenWithbalance[]
    } | null;
    loading: boolean;
}) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => {
                setCopied(false)
            }, 3000)
            return () => {
                clearTimeout(timeout)
            }
        }
    }, [copied]);

    if (loading) {
        return "Loading..."
    }

    return <div className="text-slate-500">
        <div className="mx-12 py-2">
            TipLink Account Assets
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
        <div className="pt-4 bg-slate-50 p-12 mt-4">
            <TokenList tokens={tokenBalances?.tokens || []} />
        </div>
    </div>
}