"use client";

import { useState } from "react";
import Image from "next/image";

interface Submission {
    id: string;
    player: string;
    mission: string;
    imageUrl: string;
    aiConfidence: number;
}

export default function SwipeCard({ submission, onVote }: { submission: Submission; onVote: (verdict: boolean) => void }) {
    const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null);

    const handleVote = (verdict: boolean) => {
        setSwipeDirection(verdict ? "right" : "left");
        setTimeout(() => {
            onVote(verdict);
            setSwipeDirection(null);
        }, 500);
    };

    return (
        <div className={`relative w-full max-w-md aspect-[4/5] bg-black border-2 border-neon shadow-neon flex flex-col group transition-transform duration-500 ease-out ${swipeDirection === 'left' ? '-translate-x-full rotate-[-20deg] opacity-0' : swipeDirection === 'right' ? 'translate-x-full rotate-[20deg] opacity-0' : ''}`}>

            {/* Gritty Overlays */}
            <div className="absolute inset-0 z-10 noise-bg opacity-30 mix-blend-overlay pointer-events-none"></div>
            <div className="absolute inset-0 z-10 scanlines opacity-20 pointer-events-none"></div>

            {/* Image Content */}
            <div className="relative w-full h-full overflow-hidden bg-gray-900">
                <Image
                    src={submission.imageUrl}
                    alt="Evidence"
                    fill
                    className="object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Metadata Overlay */}
                <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1">
                    <span className="text-[10px] font-mono text-neon uppercase animate-pulse">● LIVE REVIEW</span>
                    <span className="text-[10px] font-mono text-white/70">ISO 3200</span>
                </div>
            </div>

            {/* Bottom Info Panel */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-20">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <span className="block text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-1">Mission: {submission.mission}</span>
                        <h2 className="text-xl font-bold text-white uppercase leading-none tracking-tight">{submission.player}</h2>
                    </div>
                    <div className="text-right">
                        <span className="block text-[10px] text-neon font-bold tracking-widest uppercase mb-1">AI Confidence</span>
                        <span className="text-2xl font-bold text-white leading-none drop-shadow-[0_0_5px_#FF00FF]">{submission.aiConfidence}%</span>
                    </div>
                </div>

                {/* Verification Bar */}
                <div className="w-full h-1 bg-gray-800 border border-white/10 relative mt-2">
                    <div
                        className="absolute top-0 left-0 h-full bg-neon shadow-[0_0_10px_#FF00FF]"
                        style={{ width: `${submission.aiConfidence}%` }}
                    ></div>
                </div>
            </div>

            {/* Voting Buttons */}
            <div className="absolute -bottom-20 left-0 right-0 flex gap-4">
                <button
                    onClick={() => handleVote(false)}
                    className="flex-1 bg-black border border-white/30 text-white hover:bg-white hover:text-black hover:border-white transition-all py-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2 group/btn"
                >
                    <span className="material-icons text-xl group-hover/btn:text-red-500">close</span> Fail
                </button>
                <button
                    onClick={() => handleVote(true)}
                    className="flex-1 bg-neon/10 border border-neon text-neon hover:bg-neon hover:text-black transition-all py-4 font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,0,255,0.2)] hover:shadow-[0_0_25px_rgba(255,0,255,0.6)]"
                >
                    Pass <span className="material-icons text-xl">check</span>
                </button>
            </div>
        </div>
    );
}
