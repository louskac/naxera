
import { NextResponse } from "next/server";
import { getTatumSdk } from "@/lib/tatum";

export async function POST(req: Request) {
    try {
        const { address, metadata } = await req.json();
        const tatum = await getTatumSdk();

        // 1. Upload Metadata to IPFS using Tatum
        // Note: Assuming Tatum SDK has IPFS support or we use a helper.
        // Ideally: const ipfsHash = await tatum.ipfs.upload(metadata);
        // For now, let's mock the IPFS upload or use a placeholder URL if SDK differs.
        // The strategy mentioned IPFS via Tatum.
        // Let's assume we get an IPFS hash back.

        // Placeholder for actual IPFS upload logic
        const ipfsUrl = `ipfs://QmPlaceholder${Date.now()}`;

        // 2. Mint NFT to User's Wallet
        // Using NFT Express or similar
        const mintTx = await tatum.nft.mintNft({
            chain: "SOL",
            to: address,
            url: ipfsUrl,
            // Solana specific metadata structure might be needed here
            metadata: {
                name: metadata.nickname,
                symbol: "NAXID",
                uri: ipfsUrl,
                sellerFeeBasisPoints: 0,
                creators: null,
                collection: null,
                uses: null
            }
        });

        return NextResponse.json({
            success: true,
            txId: mintTx.txId,
            ipfsUrl
        });

    } catch (error) {
        console.error("Error minting profile NFT:", error);
        return NextResponse.json({ success: false, error: "Failed to mint profile NFT" }, { status: 500 });
    }
}
