"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function FinalsPage() {
    const router = useRouter();

    return (
        <div className="bg-black text-white font-display min-h-screen flex flex-col antialiased selection:bg-primary selection:text-white relative overflow-hidden">
            <div className="noise-bg"></div>
            <div className="fixed inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>

            {/* Header */}
            <header className="fixed w-full top-0 p-4 flex justify-between items-center z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="font-bold tracking-widest uppercase text-xs text-red-500">LIVE // THE FINALS</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                    <span className="material-symbols-outlined text-sm">visibility</span>
                    <span className="text-xs font-mono">1.2M watching</span>
                </div>
            </header>

            {/* Main Content (Locked State / Stream Placeholder) */}
            <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-20">

                {/* Stream Container */}
                <div className="relative w-full max-w-4xl aspect-video bg-black border border-white/20 shadow-[0_0_50px_rgba(255,0,255,0.1)] mb-8 group overflow-hidden">
                    {/* Glitch Overlay */}
                    <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3R6eW55b3R6eW55b3R6eW55b3R6eW55b3R6eW55b3R6eW55b3R6eW55/xT9IgkKL1SJVxzJCEO/giphy.gif')] opacity-10 mix-blend-screen pointer-events-none"></div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                        <span className="material-symbols-outlined text-6xl text-primary mb-4 animate-pulse drop-shadow-[0_0_15px_#FF00FF]">lock</span>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-2 text-transparent [-webkit-text-stroke:1px_white]">
                            Access Denied
                        </h1>
                        <p className="font-mono text-primary text-sm md:text-lg mb-8 uppercase tracking-widest bg-black/50 px-4 py-2 border border-primary/50">
                            Top 24 Operatives Only
                        </p>

                        <div className="flex flex-col gap-2 w-full max-w-xs">
                            <button className="bg-white text-black font-bold uppercase py-3 px-6 hover:bg-primary hover:text-black transition-all shadow-[5px_5px_0px_#FF00FF] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none">
                                Watch Stream
                            </button>
                            <p className="text-[10px] text-gray-500 font-mono text-center mt-2">
                                YOU ARE IN THE AUDIENCE
                            </p>
                        </div>
                    </div>

                    {/* CRT Scanline Effect */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
                </div>

                {/* Live Chat / Interaction Placeholder */}
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-white/10 bg-black/50 p-4 h-48 overflow-y-auto flex flex-col justify-end">
                        <div className="flex flex-col gap-2 text-xs font-mono">
                            <p><span className="text-primary font-bold">@Neon_Viper:</span> YOOOO that jump was insane!!!</p>
                            <p><span className="text-blue-400 font-bold">@Watcher001:</span> F in chat depending</p>
                            <p><span className="text-green-400 font-bold">@CryptoKing:</span> Sent 50 SOL for the next dare</p>
                            <p><span className="text-primary font-bold">@Naxera_System:</span> <span className="text-red-500">NEW CHALLENGE ISSUED:</span> HIGH WIRE ACT</p>
                        </div>
                        <div className="mt-2 flex gap-2">
                            <input type="text" placeholder="Send a message..." className="bg-white/5 border border-white/20 w-full px-3 py-2 text-xs text-white focus:outline-none focus:border-primary placeholder-gray-600" />
                        </div>
                    </div>

                    <div className="border border-white/10 bg-black/50 p-4 flex flex-col gap-2">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-2 mb-2">Issue Live Challenge</h3>
                        <button className="bg-primary/10 border border-primary text-primary hover:bg-primary hover:text-black transition-colors py-2 text-xs font-bold uppercase font-mono">
                            Flash Mob (500 Credits)
                        </button>
                        <button className="bg-red-500/10 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-colors py-2 text-xs font-bold uppercase font-mono">
                            Double or Nothing (1000 Credits)
                        </button>
                    </div>
                </div>

            </main>

            {/* Nav */}
            <nav className="fixed bottom-0 w-full bg-black/90 backdrop-blur-lg border-t border-gray-800 p-2 z-[70]">
                <div className="flex justify-around items-center max-w-lg mx-auto">
                    <button onClick={() => router.push("/lobby")} className="flex flex-col items-center p-2 text-gray-600 hover:text-white transition-colors group">
                        <span className="material-symbols-outlined text-2xl group-hover:drop-shadow-[0_0_5px_#fff]">home</span>
                        <span className="text-[10px] font-mono font-bold mt-1 uppercase">Base</span>
                    </button>
                    <button className="flex flex-col items-center p-2 text-gray-600 hover:text-white transition-colors group">
                        <span className="material-symbols-outlined text-2xl group-hover:drop-shadow-[0_0_5px_#fff]">map</span>
                        <span className="text-[10px] font-mono font-bold mt-1 uppercase">Map</span>
                    </button>
                    <div className="relative -top-6">
                        <button onClick={() => router.push("/play/mission")} className="w-16 h-16 bg-black border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_10px_#FF0099,0_0_20px_rgba(255,0,153,0.5)] hover:shadow-[0_0_25px_#FF0099] hover:scale-105 transition-all">
                            <span className="material-symbols-outlined text-3xl text-primary">play_arrow</span>
                        </button>
                    </div>
                    <button className="flex flex-col items-center p-2 text-gray-600 hover:text-white transition-colors group">
                        <span className="material-symbols-outlined text-2xl group-hover:drop-shadow-[0_0_5px_#fff]">leaderboard</span>
                        <span className="text-[10px] font-mono font-bold mt-1 uppercase">List</span>
                    </button>
                    <button className="flex flex-col items-center p-2 text-gray-600 hover:text-white transition-colors group">
                        <span className="material-symbols-outlined text-2xl group-hover:drop-shadow-[0_0_5px_#fff]">person</span>
                        <span className="text-[10px] font-mono font-bold mt-1 uppercase">Profile</span>
                    </button>
                </div>
            </nav>
        </div>
    );
}
