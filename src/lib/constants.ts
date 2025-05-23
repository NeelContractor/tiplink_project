import { Connection } from "@solana/web3.js";
import axios from "axios";
import { SUPPORTED_TOKENS } from "./tokens";

let LAST_UPDATED: number | null = null;
let prices: {[key: string]: {
    price: string;
}} = {};

const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000; // every 60s

export const connection = new Connection("https://api.devnet.solana.com");  // changing into from mainnet-beta to devnet

export async function getSupportedTokens() {
    if (!LAST_UPDATED || new Date().getTime() - LAST_UPDATED > TOKEN_PRICE_REFRESH_INTERVAL) {
        try {
            const response = await axios.get("https://lite-api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112,EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v,Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB")
            prices = response.data.data;
            LAST_UPDATED = new Date().getTime();
        } catch(e) {
            console.log("getSupportTokens error: ", e);
        }
    }

    return SUPPORTED_TOKENS.map(s => {
        // Use the mint address to look up the price
        const priceFromAPI = prices[s.mint]?.price;
        
        return {
            ...s,
            // Use the API price if available, otherwise fall back to the default price
            price: priceFromAPI || s.price
        };
    });
}




