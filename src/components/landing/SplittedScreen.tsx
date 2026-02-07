"use client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SplittedScreen() {
    const router = useRouter();

    return (
        <div className="min-h-screen font-body flex flex-col justify-between relative overflow-hidden bg-background text-foreground selection:bg-neon selection:text-white">
            {/* Background Elements */}
            <div className="noise-bg"></div>
            <div className="fixed inset-0 pointer-events-none z-[-2] bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,0),rgba(0,0,0,0.8))]"></div>
            <div className="fixed inset-0 pointer-events-none z-[-2] opacity-40 bg-[repeating-linear-gradient(45deg,#111_0,#111_1px,transparent_1px,transparent_10px)]"></div>

            {/* Header */}
            <header className="w-full p-6 flex justify-between items-center z-20 border-b border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-neon shadow-[0_0_10px_rgba(255,0,127,0.5),0_0_20px_rgba(255,0,127,0.3)] transform skew-x-[-10deg]"></div>
                    <span className="text-2xl font-display font-bold uppercase tracking-widest text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
                        Naxera
                    </span>
                </div>
                <div className="flex gap-4">
                    <button className="w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center hover:bg-neon/20 hover:border-neon transition-all duration-300">
                        <span className="material-symbols-outlined text-white text-sm">settings</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center px-6 py-4 w-full max-w-md mx-auto relative z-10">
                <div className="text-center mb-12 relative w-full">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl text-white/5 select-none -z-10 font-display font-black tracking-widest whitespace-nowrap">
                        DECIDE
                    </div>
                    <h1 className="text-5xl font-display font-black uppercase text-white leading-none tracking-tight mb-4 drop-shadow-[0_2px_0px_#FF007F]">
                        Choose<br />Your Path
                    </h1>
                    <div className="inline-block mt-2">
                        <p className="text-lg font-medium text-gray-300 max-w-xs mx-auto border-l-2 border-neon pl-4 py-1 bg-gradient-to-r from-neon/10 to-transparent font-mono">
                            The game is live. <span className="text-neon font-bold">Are you in or out?</span>
                        </p>
                    </div>
                </div>

                <div className="w-full space-y-8">
                    {/* Watcher Button */}
                    <button
                        onClick={() => router.push("/lobby?role=watcher")}
                        className="group w-full relative h-48 focus:outline-none overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
                    >
                        <div className="absolute inset-0 bg-surface border border-white/20 skew-x-[-6deg] shadow-lg group-hover:border-white/50 transition-colors"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-6deg] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <div className="relative w-full h-full p-6 flex flex-col items-start justify-between z-10">
                            <div className="w-full flex justify-between items-start pl-4 pr-2">
                                <span className="bg-gray-800/80 border border-gray-600 text-gray-300 px-3 py-1 text-xs font-mono uppercase tracking-widest">
                                    Passive Mode
                                </span>
                                <span className="material-symbols-outlined text-4xl text-gray-500 group-hover:text-white transition-colors">
                                    visibility
                                </span>
                            </div>
                            <div className="pl-4 text-left">
                                <h2 className="text-4xl font-display font-black uppercase tracking-wide text-gray-400 group-hover:text-white transition-colors animate-glitch" data-text="WATCHER">
                                    Watcher
                                </h2>
                                <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-2 group-hover:text-gray-300 transition-colors">
                                    &gt; Observe the chaos safely_
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* Divider */}
                    <div className="flex items-center justify-center w-full my-4 opacity-70">
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-neon to-transparent flex-grow"></div>
                        <span className="px-4 font-display font-bold text-xl text-neon uppercase italic tracking-widest drop-shadow-[0_0_5px_#FF00FF]">
                            OR
                        </span>
                        <div className="h-[1px] bg-gradient-to-r from-transparent via-neon to-transparent flex-grow"></div>
                    </div>

                    {/* Player Button */}
                    <button
                        onClick={() => router.push("/lobby?role=player")}
                        className="group w-full relative h-48 focus:outline-none overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
                    >
                        <div className="absolute inset-0 bg-surface border border-neon skew-x-[-6deg] shadow-[0_0_15px_rgba(255,0,127,0.2)] group-hover:shadow-neon transition-all duration-300"></div>
                        <div className="relative w-full h-full p-6 flex flex-col items-start justify-between z-10">
                            <div className="w-full flex justify-between items-start pl-4 pr-2">
                                <span className="bg-neon/20 border border-neon text-neon px-3 py-1 text-xs font-mono uppercase tracking-widest animate-pulse shadow-[0_0_10px_rgba(255,0,127,0.5)]">
                                    Live Action
                                </span>
                                <span className="material-symbols-outlined text-4xl text-neon drop-shadow-[0_0_5px_rgba(255,0,127,0.8)]">
                                    sports_esports
                                </span>
                            </div>
                            <div className="pl-4 text-left">
                                <h2 className="text-4xl font-display font-black uppercase tracking-wide text-white drop-shadow-[0_0_2px_#FF007F] animate-glitch" data-text="PLAYER">
                                    Player
                                </h2>
                                <p className="text-neon font-mono text-xs uppercase tracking-widest mt-2 group-hover:text-white transition-colors">
                                    &gt; Join the game. Win big_
                                </p>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-neon skew-x-[-6deg] translate-x-[-10px] translate-y-[10px]"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-neon skew-x-[-6deg] translate-x-[10px] translate-y-[-10px]"></div>
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full p-6 pb-8 z-10">
                <div className="border border-white/10 bg-black/40 backdrop-blur-md p-4 flex justify-between items-center text-xs font-mono relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-neon"></div>
                    <div className="flex flex-col pl-2">
                        <span className="text-gray-500 uppercase font-bold tracking-wider text-[10px]">Current Players</span>
                        <span className="text-xl font-display font-bold text-white tracking-widest">14,203</span>
                    </div>
                    <div className="h-8 w-[1px] bg-white/20"></div>
                    <div className="flex flex-col text-right">
                        <span className="text-gray-500 uppercase font-bold tracking-wider text-[10px]">Prize Pool</span>
                        <span className="text-xl font-display font-bold text-neon drop-shadow-[0_0_5px_#FF007F]">$500,000</span>
                    </div>
                </div>
                <div className="mt-6 flex justify-center gap-4 text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em] opacity-60">
                    <span className="hover:text-neon cursor-pointer transition-colors">Terms</span>
                    <span>/</span>
                    <span className="hover:text-neon cursor-pointer transition-colors">Privacy</span>
                    <span>/</span>
                    <span>v1.0.3</span>
                </div>
            </footer>

            {/* Edge Decorations */}
            <div className="fixed top-4 left-4 w-12 h-12 border-t border-l border-white/20 pointer-events-none z-50"></div>
            <div className="fixed top-4 right-4 w-12 h-12 border-t border-r border-white/20 pointer-events-none z-50"></div>
            <div className="fixed bottom-4 left-4 w-12 h-12 border-b border-l border-white/20 pointer-events-none z-50"></div>
            <div className="fixed bottom-4 right-4 w-12 h-12 border-b border-r border-white/20 pointer-events-none z-50"></div>
        </div>
    );
}
