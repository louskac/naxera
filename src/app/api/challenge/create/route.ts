
import { NextResponse } from "next/server";
import { getTatumSdk } from "@/lib/tatum";

export async function POST(req: Request) {
    try {
        const { watcherId, bountyAmount, challengeDetails } = await req.json();
        const tatum = await getTatumSdk();

        // 1. Verify Watcher has funds in their Virtual Account (VA)
        // const watcherAccount = await tatum.ledger.account.get(watcherId);
        // if (watcherAccount.balance.available < bountyAmount) ...

        // 2. Transfer from Watcher VA -> Escrow VA
        // Assume we have a global ESCROW_ACCOUNT_ID
        const ESCROW_ACCOUNT_ID = process.env.ESCROW_ACCOUNT_ID || "mock_escrow_id";

        // const transfer = await tatum.ledger.transaction.create({
        //   senderAccountId: watcherId,
        //   recipientAccountId: ESCROW_ACCOUNT_ID,
        //   amount: bountyAmount,
        //   currency: "SOL" // or "VC_CREDITS"
        // });

        // Mocking the transaction for now as we don't have real VAs set up yet
        const transfer = { id: `tx_${Date.now()}`, status: "completed" };

        return NextResponse.json({
            success: true,
            transferId: transfer.id,
            escrowId: ESCROW_ACCOUNT_ID,
            message: "Bounty secured in escrow."
        });

    } catch (error) {
        console.error("Error creating challenge escrow:", error);
        return NextResponse.json({ success: false, error: "Failed to secure bounty" }, { status: 500 });
    }
}
