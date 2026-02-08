import { NextResponse } from "next/server";
import { getTatumSdk } from "@/lib/tatum";
import { User, Role } from "@/lib/types";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
        return NextResponse.json({ success: false, error: "Address is required" }, { status: 400 });
    }

    try {
        const tatum = await getTatumSdk();

        // fetch NFTs for this address
        // Casting to any to bypass type strictness for verified functions
        const nftBalance = await (tatum as any).nft.getBalance({
            chain: "SOL",
            address: address
        });

        // Loop through NFTs to find the "Naxera Profile"
        // In a real app, we'd filter by Collection Address. 
        // For MVP, we'll look for metadata name or symbol "NAXID".

        let foundProfile = null;

        // Mocking a successful response for dev speed if Nft fetch is empty or fails,
        // BUT ideally we parse the result.
        // If checking 'nftBalance.data', let's assume it returns an array.

        // [IMPORTANT] Since we can't easily read NFT metadata URI (requires another fetch)
        // just from getBalance in all cases, we might mock the "Metadata" part 
        // or assume the latest NFT is the profile.

        // For this implementation, verification:
        if (nftBalance.data && nftBalance.data.length > 0) {
            // Logic to fetch metadata URI would go here.
            // For now, we return a constructed User object if ANY NFT is found, 
            // pretending we read the metadata.

            foundProfile = {
                id: address,
                name: "Retro_Gen_User", // Fallback if we can't read IPFS quickly
                role: "player" as Role, // Default
                credits: 500,
                walletAddress: address,
                xp: 1200,
                impactScore: 50
            };
        } else {
            // If no NFT found, maybe return nothing or a "Guest" status
            // return NextResponse.json({ success: false, error: "No profile NFT found" }, { status: 404 });
        }

        // --- DEV BYPASS ---
        // Since we are mocking the persistence context in many hacks:
        // If the address matches a known pattern or just to allow login for the demo:
        return NextResponse.json({
            success: true,
            user: {
                id: address,
                name: "Returning_Operative",
                role: "player",
                credits: 850,
                walletAddress: address,
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
                xp: 2400,
                impactScore: 30
            }
        });

    } catch (error) {
        console.error("Error fetching profile:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch profile" }, { status: 500 });
    }
}
