import { TatumSDK, Network, Solana, Nft } from "@tatumio/tatum";

export const getTatumSdk = async () => {
    // We initialize without the <Solana> generic to prevent the initial type lock
    const tatum = await TatumSDK.init({
        network: Network.SOLANA,
        apiKey: {
            v4: process.env.TATUM_API_KEY!,
        },
        verbose: true,
    });

    return tatum;
};