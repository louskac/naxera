"use client";

import { useWatcher } from "@/hooks/useWatcher";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function JuryPage() {
    const router = useRouter();
    const { pendingVerifications, voteOnverification } = useWatcher();
    const [currentCaseIndex, setCurrentCaseIndex] = useState(0);

    const currentCase = pendingVerifications[currentCaseIndex];

    if (!currentCase) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 animate-pulse">
                    <span className="material-symbols-outlined text-3xl text-primary">check_circle</span>
                </div>
                <h1 className="text-2xl font-black uppercase text-white mb-2">Queue Empty</h1>
                <p className="text-gray-400 font-mono text-sm mb-6">No pending verifications in your sector.</p>
                <button
                    onClick={() => router.push("/lobby")}
                    className="bg-white text-black px-6 py-3 font-bold uppercase tracking-widest hover:bg-primary transition-colors"
                >
                    Return to Base
                </button>
            </div>
        );
    }

    return (
        <div className="bg-background text-white font-display min-h-screen flex flex-col overflow-hidden selection:bg-neon selection:text-white relative pb-20">
            <div className="noise-bg"></div>

            {/* Header */}
            <header className="w-full p-4 flex justify-between items-center border-b border-primary/20 bg-black/90 backdrop-blur-sm z-20">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse-fast"></div>
                        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="font-bold text-lg tracking-widest uppercase text-white drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]">
                        NAXERA <span className="text-primary">//</span> JURY
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-3 py-1 border border-primary/50 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider shadow-[0_0_5px_#FF00FF]">
                        {pendingVerifications.length} Pending
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 relative flex flex-col items-center justify-start p-6 w-full max-w-md mx-auto gap-6 z-10">
                <div className="w-full flex justify-between items-end px-1 border-l-2 border-primary pl-3 py-1">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Subject ID</span>
                        <span className="text-sm font-bold uppercase tracking-widest text-white">{currentCase.submittedBy}</span>
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Case #{currentCase.challengeId.slice(-4)}</span>
                </div>

                {/* Evidence Card */}
                <div className="relative w-full aspect-[4/5] bg-black border-2 border-primary shadow-[0_0_10px_#FF00FF,0_0_20px_#FF00FF] flex flex-col group">
                    {/* Overlay Effects */}
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.2)_50%,rgba(0,0,0,0.2))] bg-[length:100%_4px]"></div>

                    <div className="relative w-full h-full overflow-hidden">
                        <img
                            alt="Submitted evidence"
                            className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
                            src={currentCase.evidence.url}
                        />
                        <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1">
                            <span className="text-[10px] font-mono text-primary uppercase animate-pulse">● EVIDENCE</span>
                            <span className="text-[10px] font-mono text-white/70">{currentCase.evidence.type}</span>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent z-20">
                        <div className="flex justify-between items-end mb-2">
                            <h2 className="text-lg font-bold text-white uppercase leading-none tracking-tight">Verify Drop</h2>
                            <div className="text-right">
                                <span className="block text-[10px] text-primary font-bold tracking-widest uppercase mb-1">AI Confidence</span>
                                <span className="text-xl font-bold text-white leading-none drop-shadow-[0_0_10px_#F0F]">{currentCase.evidence.aiConfidence}%</span>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-gray-800 border border-white/10 relative">
                            <div className="absolute top-0 left-0 h-full bg-primary shadow-[0_0_10px_#FF00FF]" style={{ width: `${currentCase.evidence.aiConfidence}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Info Panel */}
                <div className="w-full bg-surface border border-white/10 p-4 relative overflow-hidden">
                    <p className="text-sm font-medium text-gray-300 leading-snug italic mb-0 border-l-2 border-white/20 pl-3">
                        &quot;Mission complete. Package secured at the designated coordinates.&quot;
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="w-full flex gap-4 mt-auto mb-4">
                    <button
                        onClick={() => voteOnverification(currentCase.challengeId, 'reject')}
                        className="flex-1 bg-white hover:bg-gray-200 text-black border-2 border-white shadow-lg active:scale-95 transition-all h-16 flex items-center justify-center group relative overflow-hidden"
                    >
                        <span className="relative z-10 text-xl font-black uppercase tracking-wider flex items-center gap-2">
                            <span className="material-symbols-outlined">close</span> Fail
                        </span>
                    </button>
                    <button
                        onClick={async () => {
                            if (currentCase) {
                                console.log("Processing payout on-chain...");
                                try {
                                    await fetch("/api/challenge/verify", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            challengeId: currentCase.challengeId,
                                            playerId: currentCase.submittedBy,
                                            proofHash: currentCase.evidence.id // Using evidence ID as simple hash proxy
                                        })
                                    });
                                } catch (e) {
                                    console.error("Payout failed:", e);
                                }
                            }
                            voteOnverification(currentCase.challengeId, 'approve');
                        }}
                        className="flex-1 bg-primary hover:bg-[#ff33ff] text-black border-2 border-primary shadow-[0_0_10px_#FF00FF,0_0_20px_#FF00FF] active:scale-95 transition-all h-16 flex items-center justify-center group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-300 transform skew-x-12"></div>
                        <span className="relative z-10 text-xl font-black uppercase tracking-wider flex items-center gap-2">
                            Pass <span className="material-symbols-outlined">check</span>
                        </span>
                    </button>
                </div>
            </main>
        </div>
    );
}
