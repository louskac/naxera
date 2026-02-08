
import { NextResponse } from "next/server";
import { getTatumSdk } from "@/lib/tatum";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";

export async function POST(req: Request) {
    try {
        // const tatum = await getTatumSdk(); // Unused and causing init errors.

        // Generate a new Solana wallet using @solana/web3.js
        const keypair = Keypair.generate();
        const address = keypair.publicKey.toBase58();

        // bs58.encode is standard way to represent Solana secret key
        const privateKey = bs58.encode(keypair.secretKey);

        // Mnemonic is N/A for keypair generation
        const mnemonic = "N/A (Keypair Mode)";

        return NextResponse.json({
            success: true,
            address,
            privateKey, // CAUTION: Only for MVP/Demo purposes to let user save it.
            mnemonic
        });
    } catch (error) {
        console.error("Error creating wallet:", error);
        return NextResponse.json({ success: false, error: "Failed to generate wallet" }, { status: 500 });
    }
}
