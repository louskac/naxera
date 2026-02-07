
import { TatumSDK, Network, Solana } from "@tatumio/tatum";

// Initialize Tatum SDK for Solana
export const getTatumSdk = async () => {
    return await TatumSDK.init<Solana>({
        network: Network.SOLANA,
        apiKey: {
            v1: process.env.TATUM_API_KEY,
        },
        verbose: true, // Enable logging for debugging
    });
};
