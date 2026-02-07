"use client";

const RANKS = [
    { rank: 1, user: "Cipher_X", score: 2991020, status: "safe" },
    { rank: 2, user: "Neon_Viper", score: 2840115, status: "safe" },
    { rank: 3, user: "K-oz", score: 2710004, status: "safe" },
    { rank: 4, user: "Ghost_Protocol", score: 2500231, status: "safe" },
    { rank: 5, user: "Data_Miner", score: 2488100, status: "safe" },
    // ... skipping some for brevity
    { rank: 23, user: "Pixel_Dust", score: 1800200, status: "danger" },
    { rank: 24, user: "Glitch_Queen", score: 1799999, status: "danger" },
    // Cutoff
    { rank: 25, user: "System_Failure", score: 1799500, status: "eliminated" },
    { rank: 26, user: "Null_Pointer", score: 1780000, status: "eliminated" },
];

export default function RankList() {
    return (
        <div className="w-full max-w-lg bg-surface/50 backdrop-blur-md border border-white/10 relative">
            <div className="flex bg-black text-gray-500 font-mono text-[10px] uppercase py-2 px-4 border-b border-gray-800 sticky top-0 z-30">
                <div className="w-8 text-center">#</div>
                <div className="flex-grow pl-3">Operative</div>
                <div className="w-24 text-right">Bounty (XP)</div>
            </div>

            <div className="divide-y divide-gray-800/50">
                {RANKS.map((player) => (
                    <div key={player.rank} className="relative group">
                        {/* The Red Line Separation */}
                        {player.rank === 25 && (
                            <div className="sticky top-8 z-40 bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-[0.2em] py-1 text-center shadow-[0_0_15px_#FF0000] border-y border-red-500 animate-pulse">
                                Elimination Threshold // Top 24 Only
                            </div>
                        )}

                        <div className={`flex items-center py-4 px-4 hover:bg-white/5 transition-colors cursor-pointer ${player.status === 'eliminated' ? 'opacity-50 grayscale' : ''}`}>
                            <div className={`w-8 text-center font-black italic text-xl ${player.rank <= 3 ? 'text-neon drop-shadow-[0_0_5px_#FF00FF]' : 'text-gray-600'}`}>
                                {player.rank}
                            </div>
                            <div className="flex-grow pl-3 flex items-center gap-3">
                                <span className={`font-bold uppercase truncate font-mono ${player.status === 'eliminated' ? 'text-gray-500 line-through decoration-red-500' : 'text-white group-hover:text-neon transition-colors'}`}>
                                    {player.user}
                                </span>
                                {player.rank === 1 && <span className="material-icons text-[10px] text-black bg-neon rounded-full p-0.5">star</span>}
                            </div>
                            <div className={`w-24 text-right font-mono font-bold ${player.status === 'eliminated' ? 'text-gray-600' : 'text-neon-cyan'}`}>
                                {player.score.toLocaleString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
