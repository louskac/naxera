"use client";

import { useEffect, useState } from "react";

const events = [
    { type: "join", user: "Ghost_Protocol", action: "joined as Player" },
    { type: "watcher", user: "Neon_Dreamer", action: "added $10 to pool" },
    { type: "challenge", user: "Viral_King", action: "submitted: 'High-five a stranger'" },
    { type: "player", user: "Risk_Taker_99", action: "verified: Liveness Check" },
    { type: "watcher", user: "Crypto_Whale", action: "added $50 to pool" },
    { type: "system", user: "NAXERA_AI", action: "Glitch detected in Sector 4" },
];

export default function LiveFeed() {
    const [feed, setFeed] = useState(events);

    useEffect(() => {
        const interval = setInterval(() => {
            // Rotate events to simulate live feed
            setFeed(prev => {
                const last = prev[prev.length - 1];
                const rest = prev.slice(0, prev.length - 1);
                return [last, ...rest];
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-2xl mx-auto h-32 overflow-hidden border-t border-b border-white/10 bg-black/50 relative mask-image-linear-to-b">
            <div className="absolute top-0 left-0 bg-neon px-2 py-0.5 text-[10px] font-bold text-black uppercase tracking-wider z-10">
                Live Feed
            </div>
            <div className="flex flex-col gap-2 p-4 pt-8">
                {feed.map((event, i) => (
                    <div key={i} className={`flex items-center gap-2 text-xs font-mono transition-all duration-500 ${i === 0 ? "opacity-100 translate-x-0" : "opacity-40"}`}>
                        <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>
                        <span className={`font-bold ${event.type === 'watcher' ? 'text-neon-cyan' : event.type === 'player' ? 'text-neon' : 'text-white'}`}>
                            {event.user}
                        </span>
                        <span className="text-gray-400">&gt; {event.action}</span>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
        </div>
    );
}
