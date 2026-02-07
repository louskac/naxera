
const BASE_URL = "http://localhost:3000";

async function runTest() {
    console.log("🚀 Starting Tatum Integration Test...");

    // 1. Create Wallet
    console.log("\n1️⃣  Creating User Wallet...");
    const walletRes = await fetch(`${BASE_URL}/api/wallet/create`, { method: "POST" });
    const walletData = await walletRes.json();

    if (!walletData.success) {
        console.error("❌ Wallet creation failed:", walletData);
        return;
    }
    console.log("✅ Wallet Created:");
    console.log(`   Address: ${walletData.address}`);
    console.log(`   Private Key: ${walletData.privateKey.substring(0, 10)}... (HIDDEN)`);

    // 2. Mint Profile NFT
    console.log("\n2️⃣  Minting Profile NFT (SocialFi Identity)...");
    const mintRes = await fetch(`${BASE_URL}/api/profile/mint`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            address: walletData.address,
            metadata: { nickname: "TestRunner", bio: "Automated Tester", avatar: "http://example.com/avatar.png" }
        })
    });
    const mintData = await mintRes.json();
    console.log("✅ Profile Mint Response:", mintData);

    // 3. Create Challenge (Escrow)
    console.log("\n3️⃣  Creating Challenge (Funding Escrow)...");
    const challengeRes = await fetch(`${BASE_URL}/api/challenge/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            watcherId: "test_watcher_id",
            bountyAmount: "100",
            challengeDetails: { title: "Test Mission" }
        })
    });
    const challengeData = await challengeRes.json();
    console.log("✅ Challenge Created:", challengeData);

    // 4. Verify & Payout
    console.log("\n4️⃣  Verifying & Payout (On-Chain Memo)...");
    const verifyRes = await fetch(`${BASE_URL}/api/challenge/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            challengeId: "ch_test_001",
            playerId: "test_player_id", // In real app, this would be the virtual account ID
            proofHash: "QmHashOfProof"
        })
    });
    const verifyData = await verifyRes.json();
    console.log("✅ Verification Response:", verifyData);

    console.log("\n✨ Test Sequence Complete!");
}

runTest().catch(console.error);
