"use client";

import { useGame } from "@/context/GameContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function LeaderboardPage() {
    const { role } = useGame();
    const isWatcher = role === "watcher";
    const [boostedPlayers, setBoostedPlayers] = useState<string[]>([]);

    const handleBoost = (playerId: string) => {
        if (boostedPlayers.includes(playerId)) return;
        setBoostedPlayers([...boostedPlayers, playerId]);
        // In real app, this would trigger a transaction
    };

    const players = [
        { id: "p1", rank: 1, name: "Cipher_X", score: "2,991,020", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAOVSjVwU-zFo07p57j0RB794hia8-blD1gx6LfzUWYKki-H508kUKfSIbXs-n0BGM59fTf9qnhVFaXF2KQ9TsNTuGdDGaw5rp_fm7BmoltZZpkqGwWQfJdd9ijMZrAwcpChiSvUx0jxKMFsyzc_e-wWViiWvhR2heI4hpCZeJQrs4xBO23DvL7F3hbnpIBDCre3Gn9NoneBFGu05VLfM55uH1IxMNcFrq1LtJZGnxbxpY7G67kR4NtaafHWGRlqi3jBunQju1d8rs", isTop: true, change: "+2" },
        { id: "p2", rank: 2, name: "Neon_Viper", score: "2,840,115", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCm8vYx233em9qxKpStWz3Ynhov02c69ZopCekDnyzxzOHta6jbxaXio4shTiSHlzbqAJtgvhmlfoFeaHyEczghkpHdj6NWZzOI73Q7cYY1s6zJ-SHBgbpPAVUJAbmuTFF9GvzScj00Maoiv1ZG0REoqOVIvV5nMBaaBBTY2eb-IDqzS3c4pkP4uqag8WAPawE_PZ6O1is8HE9uPdM7-1swiITBGjtbFW5kdyQu7ltcAkiOpvEXSGncYXMGEelujwAMvJaCI_dt_Ew", isTop: true, change: "-1" },
        { id: "p3", rank: 3, name: "K-oz", score: "2,710,004", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAU2bi-FtrsToE31-lkwrNxNCyKPjDFyXlX9eqw3rgwDbt0RA8C3w9DdCyUoeDuHiSc223hL8btx63LHV20g8d_XRYGUUDyu8s_-DTlQIgW5JIhcoG3brQS7aktvheesGxBRqkEzOI84l-bWNbfBFL4R9wb86Xvsdctrbrvpqz02I7jN07DqBeXAGx7eTW0cy0mQMW45ztBpYL6U9qbROvqg9u0EBjb70tNaSg8ddeIzjpIHjB7yYIPUthwIly9hERorQ68w5pphu4", isTop: true, change: "0" },
        { id: "p4", rank: 4, name: "Ghost_Protocol", score: "2,500,231", isTop: false, change: "+5" },
        { id: "p5", rank: 5, name: "Data_Miner", score: "2,488,100", isTop: false, change: "-2" },
        { id: "p6", rank: 6, name: "System_Shock", score: "2,350,992", isTop: false, change: "+1" },
        { id: "p7", rank: 7, name: "Bit_Crusher", score: "2,310,445", isTop: false, change: "0" },
        { id: "p8", rank: 8, name: "Analog_Kid", score: "2,209,112", isTop: false, change: "+3" },
        { id: "p9", rank: 9, name: "Zero_Cool", score: "2,150,000", isTop: false, change: "-1" },
    ];

    return (
        <div className="bg-black text-white font-display min-h-screen flex flex-col antialiased selection:bg-primary selection:text-white relative">
            <div className="fixed inset-0 pointer-events-none opacity-40 z-50 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.4))] bg-[length:100%_4px]"></div>

            {/* Header */}
            <header className="sticky top-0 z-[60] bg-black border-b border-gray-800 p-4 flex justify-between items-center backdrop-blur-md bg-opacity-90">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black border border-primary flex items-center justify-center shadow-[0_0_10px_rgba(255,0,153,0.3)]">
                        <span className="material-symbols-outlined text-primary">leaderboard</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-black italic tracking-tighter text-white drop-shadow-[2px_2px_0px_#FF0099]">
                            {isWatcher ? "INVESTMENT" : "LEADERBOARD"}
                        </h1>
                        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest leading-none">
                            {isWatcher ? "Fund Top Agents" : "Global Rankings"}
                        </p>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col pb-24 relative z-10">
                <div className="p-4 space-y-6">
                    <div className="flex justify-between items-end border-b-2 border-primary/50 pb-2">
                        <div>
                            <h2 className="text-5xl font-black uppercase leading-none tracking-tight text-white drop-shadow-[2px_0_#F09,-2px_0_#0FF]">
                                {isWatcher ? "TOP\nPICKS" : "THE\nHITLIST"}
                            </h2>
                        </div>
                        <div className="text-right font-mono text-xs font-bold text-gray-400">
                            <span className="block text-primary drop-shadow-[0_0_10px_#F09]">SEASON 04</span>
                            <span className="block text-white">CYCLE: PURGE</span>
                        </div>
                    </div>

                    {/* Active User Card (Contextual) */}
                    <div className="bg-black/80 border border-primary/30 p-4 shadow-[0_0_10px_#FF0099,0_0_20px_rgba(255,0,153,0.5)] relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                        <div className="absolute top-0 right-0 bg-primary text-black font-black px-3 py-1 text-xs uppercase tracking-widest">
                            {isWatcher ? "Your Impact" : "Target: You"}
                        </div>
                        <div className="flex items-center gap-4 mt-3 relative z-10">
                            <div className="w-16 h-16 bg-black border-2 border-primary rounded-none flex-shrink-0 overflow-hidden shadow-[0_0_15px_rgba(255,0,153,0.4)] flex items-center justify-center">
                                {isWatcher ? (
                                    <span className="material-symbols-outlined text-3xl text-primary">visibility</span>
                                ) : (
                                    <span className="material-symbols-outlined text-3xl text-white">person</span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold uppercase tracking-wide text-white">{isWatcher ? "Watcher_One" : "Player_One"}</h3>
                                <p className="font-mono text-primary text-sm mt-1">
                                    {isWatcher ? "$45,000 Invested" : "1,402,995 XP"}
                                </p>
                            </div>
                            <div className="ml-auto text-4xl font-black text-white italic drop-shadow-[2px_2px_0px_#FF0099]">
                                {isWatcher ? "Lvl 5" : "#42"}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Elimination Threshold Header */}
                <div className="bg-primary border-y-4 border-black py-4 px-4 flex justify-between items-center sticky top-[72px] z-40 shadow-[0_0_15px_#FF0099,0_0_30px_#FF0099,0_0_45px_#FF0099]">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-black animate-pulse">emergency</span>
                        <span className="font-black text-black uppercase tracking-[0.2em] text-sm md:text-base">Elimination Threshold</span>
                    </div>
                    <span className="font-mono text-black font-bold text-xs bg-white px-1">TOP 100 SAFE</span>
                </div>

                {/* Leaderboard List */}
                <div className="flex flex-col border-t-0 border-black bg-black">
                    <div className="flex bg-black text-gray-500 font-mono text-[10px] uppercase py-2 px-4 border-b border-gray-800 sticky top-[125px] z-30">
                        <div className="w-10 text-center">#</div>
                        <div className="flex-grow pl-3">Operative</div>
                        <div className="w-24 text-right">{isWatcher ? "Action" : "Bounty"}</div>
                    </div>

                    {players.map((player) => (
                        <div key={player.rank} className={cn(
                            "group flex items-center border-b border-gray-800 py-4 px-4 hover:bg-primary/5 transition-colors cursor-pointer relative overflow-hidden",
                            player.isTop ? "bg-gray-900/50" : "bg-black"
                        )}
                        >
                            {player.rank === 1 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                            <div className={cn(
                                "w-10 text-center font-black italic",
                                player.rank === 1 ? "text-3xl text-primary drop-shadow-[0_0_10px_#F09]" :
                                    player.rank === 2 ? "text-2xl text-primary/80" :
                                        player.rank === 3 ? "text-2xl text-primary/60" :
                                            "text-xl font-mono text-gray-600 group-hover:text-primary"
                            )}>
                                {player.rank.toString().padStart(2, '0')}
                            </div>
                            <div className="flex-grow pl-3 flex items-center gap-3 overflow-hidden">
                                {player.avatar && (
                                    <div className="w-10 h-10 bg-black border border-gray-600 flex-shrink-0 overflow-hidden">
                                        <img alt={`Rank ${player.rank} Avatar`} className="w-full h-full object-cover grayscale contrast-125" src={player.avatar} />
                                    </div>
                                )}
                                <div className="flex flex-col overflow-hidden">
                                    <span className={cn(
                                        "font-bold uppercase truncate font-mono",
                                        player.rank <= 3 ? "text-lg" : "text-gray-400 group-hover:text-white",
                                        player.rank === 1 ? "text-white" : "",
                                        player.rank === 2 ? "text-gray-200" : "",
                                        player.rank === 3 ? "text-gray-300" : ""
                                    )}>
                                        {player.name}
                                    </span>
                                    <span className={cn(
                                        "text-[10px] font-mono",
                                        player.change.startsWith("+") ? "text-green-500" :
                                            player.change.startsWith("-") ? "text-red-500" : "text-gray-600"
                                    )}>
                                        {player.change !== "0" ? `${player.change} POS` : "NO CHANGE"}
                                    </span>
                                </div>
                            </div>
                            <div className="w-28 text-right font-mono font-bold text-lg flex justify-end">
                                {isWatcher ? (
                                    <button
                                        onClick={() => handleBoost(player.id)}
                                        disabled={boostedPlayers.includes(player.id)}
                                        className={cn(
                                            "text-xs px-3 py-2 uppercase font-black tracking-wider transition-all border",
                                            boostedPlayers.includes(player.id)
                                                ? "bg-primary text-black border-primary shadow-[0_0_10px_#FF00FF]"
                                                : "bg-transparent text-primary border-primary/50 hover:bg-primary hover:text-black hover:shadow-[0_0_10px_#FF00FF]"
                                        )}
                                    >
                                        {boostedPlayers.includes(player.id) ? "Boosted" : "Boost"}
                                    </button>
                                ) : (
                                    <span className={cn(
                                        player.rank === 1 ? "text-primary" :
                                            player.rank === 2 ? "text-primary/80" :
                                                player.rank === 3 ? "text-primary/60" :
                                                    "text-sm text-gray-500"
                                    )}>
                                        {player.score}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
