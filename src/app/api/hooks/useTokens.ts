import { TokenDetails } from "@/lib/tokens";
import axios from "axios";
import { useEffect, useState } from "react";

export interface TokenWithbalance extends TokenDetails {
    balance: string;
    usdBalance: string;
}

export function useTokens(address: string) {
    const [tokenBalances, setTokenBalances] = useState<{
        totalBalance: number,
        tokens: TokenWithbalance[]
    } | null >(null);
    const [loading, setLoading] = useState(true);

    console.log("addressssss:", address);
    useEffect(() => {
        axios.get(`/api/tokens?address=${address}`)
            .then(res => {
                setTokenBalances(res.data);
                setLoading(false)
            })
    }, [address])

    console.log("tokenBalances: ", tokenBalances);
    return {
        loading, tokenBalances
    }
}