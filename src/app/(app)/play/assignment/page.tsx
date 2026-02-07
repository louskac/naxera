"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AssignmentPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen font-body flex flex-col relative overflow-hidden bg-background text-foreground">
            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none opacity-60 z-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.07%22/%3E%3C/svg%3E')]"></div>
            <div className="fixed inset-0 scanlines pointer-events-none z-10"></div>
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none z-0"></div>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-primary shadow-[0_0_15px_rgba(255,0,255,0.5),inset_0_0_10px_rgba(255,0,255,0.1)] px-4 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary flex items-center justify-center shadow-[0_0_8px_rgba(255,0,255,0.6)]">
                        <span className="font-display text-black text-xl">N</span>
                    </div>
                    <h1 className="font-display text-2xl uppercase tracking-tighter text-white drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]">NAXERA</h1>
                </div>
                <div className="flex gap-3">
                    <button className="w-10 h-10 flex items-center justify-center border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all rounded-sm shadow-[0_0_8px_rgba(255,0,255,0.6)]">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center border border-primary/50 text-white hover:bg-white hover:text-black transition-all rounded-sm">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow px-4 pt-6 pb-28 overflow-y-auto relative z-10">
                <div className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
                    <div>
                        <p className="text-[10px] font-bold uppercase text-primary mb-1 tracking-widest">System Status</p>
                        <div className="text-3xl font-display uppercase leading-none text-white drop-shadow-[2px_0_#00ffff,-2px_0_#ff00ff]">ONLINE</div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold uppercase text-gray-500 mb-1 tracking-widest">Rank</p>
                        <div className="text-xl font-bold text-primary font-display">#402</div>
                    </div>
                </div>

                <h2 className="font-display text-5xl mb-8 uppercase text-transparent [-webkit-text-stroke:1px_#FF00FF] drop-shadow-[0_0_8px_rgba(255,0,255,0.6)]">
                    Mission<br />Deck
                </h2>

                <div className="space-y-8">
                    {/* Active Mission Card */}
                    <article className="relative group">
                        <div className="relative bg-surface border border-primary shadow-[0_0_15px_rgba(255,0,255,0.5),inset_0_0_10px_rgba(255,0,255,0.1)] p-0 flex flex-col h-full transition-transform active:scale-[0.98]">
                            <div className="h-32 bg-surface border-b border-primary/30 flex items-center justify-center overflow-hidden relative group-hover:bg-surface/80 transition-colors">
                                <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E')]"></div>
                                <span className="material-symbols-outlined text-6xl text-primary opacity-80 drop-shadow-[0_0_10px_#ff00ff]">radar</span>
                                <div className="absolute top-0 right-0 bg-primary text-black px-3 py-1 text-[10px] font-bold uppercase">Priority Alpha</div>
                            </div>
                            <div className="p-5 flex flex-col gap-4">
                                <div>
                                    <h3 className="font-display text-2xl uppercase leading-tight mb-2 text-white drop-shadow-[2px_0_#00ffff,-2px_0_#ff00ff]">Signal Intercept</h3>
                                    <p className="text-xs font-bold leading-relaxed text-gray-400 font-mono">
                                        <span className="text-primary">&gt;</span> Locate 3 hidden QR beacons in the downtown sector within 45 minutes.
                                    </p>
                                </div>
                                <div className="flex gap-3 mt-2">
                                    <div className="flex-1 bg-surface border border-gray-700 p-2 text-center">
                                        <span className="block text-[10px] font-bold uppercase text-gray-500">XP</span>
                                        <span className="block font-display text-lg text-white">+1250</span>
                                    </div>
                                    <div className="flex-1 bg-primary/10 border border-primary p-2 text-center shadow-[0_0_8px_rgba(255,0,255,0.6)]">
                                        <span className="block text-[10px] font-bold uppercase text-primary">Bounty</span>
                                        <span className="block font-display text-lg text-primary drop-shadow-[0_0_5px_#ff00ff]">$500</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => router.push("/play/mission")}
                                    className="w-full bg-primary text-black font-display uppercase py-3 text-lg hover:bg-white transition-colors shadow-[0_0_8px_rgba(255,0,255,0.6)] [clip-path:polygon(0_0,100%_0,100%_80%,95%_100%,0_100%)]"
                                >
                                    Decrypt & Accept
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Pending Mission Card */}
                    <article className="relative group">
                        <div className="relative bg-surface border border-primary shadow-[0_0_15px_rgba(255,0,255,0.5),inset_0_0_10px_rgba(255,0,255,0.1)] p-0 flex flex-col h-full active:scale-[0.98] transition-transform">
                            <div className="p-5 flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div className="bg-surface border border-gray-600 px-2 py-1 inline-block">
                                        <span className="text-[10px] font-bold uppercase tracking-wide text-secondary">Stealth Ops</span>
                                    </div>
                                    <span className="material-symbols-outlined text-3xl text-gray-500">visibility_off</span>
                                </div>
                                <h3 className="font-display text-2xl uppercase leading-tight text-white mt-1 drop-shadow-[2px_0_#00ffff,-2px_0_#ff00ff]">Night Drop</h3>
                                <p className="text-xs font-bold text-gray-400 font-mono">
                                    <span className="text-primary">&gt;</span> Deliver payload to sector 4. Zero detection allowed.
                                </p>
                                <div className="mt-2 p-3 bg-surface border border-gray-700 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <span className="material-symbols-outlined text-sm">timer</span>
                                        <span className="font-bold text-xs">02:15:00</span>
                                    </div>
                                    <div className="text-primary font-display text-sm drop-shadow-[0_0_3px_#ff00ff]">
                                        400 CR
                                    </div>
                                </div>
                                <button className="w-full mt-2 bg-transparent border border-primary text-primary font-display uppercase py-2 hover:bg-primary hover:text-black transition-colors text-sm shadow-[0_0_8px_rgba(255,0,255,0.6)]">
                                    View Intel
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Locked Mission Card */}
                    <article className="relative opacity-90">
                        <div className="relative bg-black border-2 border-primary border-dashed p-6 flex flex-col items-center justify-center text-center gap-4 py-12 shadow-[0_0_20px_rgba(255,0,255,0.2)]">
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>
                            <div className="w-20 h-20 border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(255,0,255,0.5)] animate-pulse">
                                <span className="material-symbols-outlined text-primary text-4xl">lock</span>
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-display text-xl uppercase text-gray-500 tracking-widest">Encrypted</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mt-2">Clearance Lvl 5 Required</p>
                            </div>
                            <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden mt-2 relative border border-gray-700">
                                <div className="bg-gradient-to-r from-primary/50 to-primary h-full w-3/4 absolute left-0 top-0 shadow-[0_0_10px_#ff00ff]"></div>
                            </div>
                            <p className="text-[9px] font-bold text-primary uppercase mt-1">Decryption 75%</p>
                        </div>
                    </article>
                </div>
            </main>

            {/* Nav Bar */}
            <nav className="fixed bottom-6 left-4 right-4 z-50">
                <div className="bg-black/95 backdrop-blur border border-primary p-2 shadow-[0_0_15px_rgba(255,0,255,0.5)] flex justify-between items-center px-6 rounded-none">
                    <button onClick={() => router.push("/lobby")} className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">home</span>
                        <span className="text-[8px] font-bold uppercase tracking-widest">Base</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-primary transform scale-110 drop-shadow-[0_0_5px_#ff00ff]">
                        <span className="material-symbols-outlined text-2xl">layers</span>
                        <span className="text-[8px] font-bold uppercase tracking-widest">Deck</span>
                    </button>
                    <button onClick={() => router.push("/play/mission")} className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">map</span>
                        <span className="text-[8px] font-bold uppercase tracking-widest">Map</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-xl">person</span>
                        <span className="text-[8px] font-bold uppercase tracking-widest">Profile</span>
                    </button>
                </div>
            </nav>

            {/* Floating Notification */}
            <div className="fixed bottom-24 right-8 z-40 animate-bounce">
                <div className="bg-primary text-black px-3 py-1 font-display text-xs uppercase shadow-[0_0_15px_rgba(255,0,255,0.5)] border border-white">
                    +2 Signals
                </div>
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-primary border-r-[6px] border-r-transparent mx-auto"></div>
            </div>
        </div>
    );
}
