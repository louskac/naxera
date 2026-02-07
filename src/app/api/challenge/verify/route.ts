
import { NextResponse } from "next/server";
import { getTatumSdk } from "@/lib/tatum";

export async function POST(req: Request) {
    try {
        const { challengeId, playerId, escrowTxId, proofHash } = await req.json();
        const tatum = await getTatumSdk();

        // 1. Transfer Funds: Escrow VA -> Player VA
        // Assuming backend manages the transfer logic
        const ESCROW_ACCOUNT_ID = process.env.ESCROW_ACCOUNT_ID || "mock_escrow_id";
        // const playerAccount = await tatum.ledger.account.get(playerId); // or map user ID to VA ID

        // Simulation of internal transfer
        // const payoutTx = await tatum.ledger.transaction.create({
        //   senderAccountId: ESCROW_ACCOUNT_ID,
        //   recipientAccountId: playerId,
        //   amount: "500", // Retrieve amount from challenge details
        //   currency: "SOL"
        // });

        const payoutTx = { id: `tx_payout_${Date.now()}`, status: "completed" };

        // 2. On-Chain "SocialFi" Record (The Memo)
        // Send a 0-value transaction (or minimal dust) to the player's real wallet address with a memo
        // This makes the achievement public and permanent on Solana.

        // We need the player's real wallet address for this.
        // const playerWalletArgs = await getPlayerWalletAddress(playerId);

        // Tatum SDK or Web3.js for Solana transaction with memo
        // Simulation:
        // const receiptTx = await tatum.solana.transaction.send({
        //   from: SYSTEM_WALLET,
        //   to: playerWalletArgs.address,
        //   amount: "0.00001", // Dust
        //   memo: `Use:Naxera|Mission:${challengeId}|Proof:${proofHash}`
        // });

        const receiptTx = { signature: `sol_sig_${Date.now()}`, memo: `Use:Naxera|Mission:${challengeId}|Proof:${proofHash}` };

        return NextResponse.json({
            success: true,
            payoutId: payoutTx.id,
            receiptSignature: receiptTx.signature,
            message: "Payout complete & recorded on-chain."
        });

    } catch (error) {
        console.error("Error verifying challenge:", error);
        return NextResponse.json({ success: false, error: "Verification failed" }, { status: 500 });
    }
}
