import { NextResponse } from "next/server";
// import { getTatumSdk } from "@/lib/tatum"; // Unused due to raw fetch fallback

export async function POST(req: Request) {
    try {
        const { address, metadata } = await req.json();
        // const tatum = await getTatumSdk(); 

        let ipfsUrl = "";

        // 1. Upload Image to IPFS if provided
        if (metadata.avatar && metadata.avatar.startsWith("data:image")) {
            console.log("Uploading avatar to IPFS...");
            try {
                // Convert base64 to Blob/Buffer
                const base64Data = metadata.avatar.replace(/^data:image\/\w+;base64,/, "");
                const buffer = Buffer.from(base64Data, 'base64');
                const blob = new Blob([buffer], { type: "image/jpeg" });

                const formData = new FormData();
                formData.append("file", blob, "avatar.jpg");

                const ipfsRes = await fetch("https://api.tatum.io/v3/ipfs", {
                    method: "POST",
                    headers: {
                        "x-api-key": process.env.TATUM_API_KEY!
                        // Content-Type is set automatically by fetch with FormData
                    },
                    body: formData
                });

                if (!ipfsRes.ok) {
                    throw new Error(`IPFS Upload failed: ${ipfsRes.status} ${ipfsRes.statusText}`);
                }

                const ipfsData = await ipfsRes.json();

                if (ipfsData && ipfsData.ipfsHash) {
                    ipfsUrl = `ipfs://${ipfsData.ipfsHash}`;
                    console.log("IPFS Upload Success:", ipfsUrl);
                } else {
                    console.warn("IPFS Upload returned no hash", ipfsData);
                    ipfsUrl = `https://ipfs.io/ipfs/QmPlaceholder${Date.now()}`;
                }
            } catch (uploadError) {
                console.error("IPFS Upload Failed:", uploadError);
                // Fallback to placeholder if upload fails (to not block signup)
                ipfsUrl = "https://via.placeholder.com/300";
            }
        } else {
            // Default identicon or placeholder
            ipfsUrl = "https://via.placeholder.com/300";
        }

        // 2. Prepare Metadata for NFT & Mint
        console.log("Minting NFT for:", address);

        const mintBody = {
            chain: "SOL",
            to: address,
            url: ipfsUrl,
            metadata: {
                name: metadata.nickname || "Naxera Profile",
                symbol: "NAXID",
                uri: ipfsUrl,
                sellerFeeBasisPoints: 0,
            }
        };

        const mintRes = await fetch("https://api.tatum.io/v3/nft/mint", {
            method: "POST",
            headers: {
                "x-api-key": process.env.TATUM_API_KEY!,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mintBody)
        });

        const mintData = await mintRes.json();

        if (!mintRes.ok) {
            console.error("Minting API Error:", mintData);
            throw new Error(`Minting failed: ${JSON.stringify(mintData)}`);
        }

        // Safe access to the transaction ID
        const txId = mintData.txId;

        if (!txId) {
            console.error("Minting response invalid:", mintData);
            throw new Error("Minting failed: No transaction ID returned");
        }

        console.log("Mint Success! TxID:", txId);
        console.log("View on Solscan (Devnet):", `https://solscan.io/tx/${txId}?cluster=devnet`);

        return NextResponse.json({
            success: true,
            txId,
            ipfsUrl
        });

    } catch (error: any) {
        console.error("Full Error Object:", JSON.stringify(error, null, 2));
        return NextResponse.json({
            success: false,
            error: error.message || "Failed to mint profile NFT"
        }, { status: 500 });
    }
}