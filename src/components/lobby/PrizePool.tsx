"use client";

import { useEffect, useState } from "react";

export default function PrizePool() {
    const [total, setTotal] = useState(542030); // Starting pool

    // Simulate live updates
    useEffect(() => {
        const interval = setInterval(() => {
            // Randomly add $5 - $25 every few seconds
            if (Math.random() > 0.7) {
                setTotal(prev => prev + Math.floor(Math.random() * 20) + 5);
            }
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative group p-6 border border-white/10 bg-surface/50 backdrop-blur-sm overflow-hidden w-full max-w-sm mx-auto">
            <div className="absolute top-0 left-0 w-1 h-full bg-neon group-hover:shadow-[0_0_15px_#FF00FF] transition-all duration-300"></div>
            <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-1">Current Prize Pool</span>
                <div className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter tabular-nums drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                    ${total.toLocaleString()}
                </div>
                <span className="text-[10px] text-neon-cyan/60 animate-pulse mt-2">&gt; LIVE contributions active</span>
            </div>
        </div>
    );
}
