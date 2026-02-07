"use client";
import { useRouter } from "next/navigation";

export default function SplittedScreen() {
    const router = useRouter();

    return (
        /* Entire app fits on 1 screen */
        <div className="h-screen w-full font-display flex flex-col relative overflow-hidden bg-black text-white selection:bg-primary selection:text-white">

            {/* Background Texture Layers */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>
            <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_4px)]"></div>

            {/* Header: High Contrast Brutalism */}
            <header className="w-full p-5 flex justify-between items-center z-30 shrink-0 border-b-2 border-white/5">
                <div className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-8 h-8 bg-primary shadow-[4px_4px_0px_#00f2ff] transform -skew-x-12"></div>
                    <span className="text-2xl font-black italic tracking-tighter uppercase ml-2">
                        NAX<span className="text-primary">ERA</span>
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:block font-mono text-[9px] text-primary tracking-widest animate-pulse">
                        &gt; CONNECTION_STABLE_
                    </div>
                    <button className="w-10 h-10 border-2 border-white/20 bg-zinc-900 flex items-center justify-center hover:bg-primary transition-all active:scale-90">
                        <span className="material-symbols-outlined text-lg">settings</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center justify-around px-4 py-4 w-full max-w-lg mx-auto relative z-10">

                {/* Hero Title: Restoring your Original Glitch Effect */}
                <div className="text-center relative shrink-0">
                    <div className="mb-2 inline-block bg-primary px-3 py-1 text-[9px] font-bold uppercase tracking-[0.3em] text-white">
                        THE PATH IS YOURS
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black leading-[0.85] uppercase italic tracking-tighter">
                        <span className="glitch-text block" data-text="CHOOSE">CHOOSE</span>
                        <span className="text-primary block drop-shadow-[0_0_15px_rgba(255,0,127,0.4)]">YOUR PATH.</span>
                    </h1>
                </div>

                {/* Selection Cards */}
                <div className="w-full space-y-14 mt-4 relative">

                    {/* RICH ENERGY Watermark from original app */}
                    <div className="absolute top-1/2 -left-20 font-marker text-accent text-6xl opacity-10 -rotate-12 select-none pointer-events-none whitespace-nowrap z-0">
                        RICH ENERGY
                    </div>

                    {/* WATCHER BOX */}
                    <button
                        onClick={() => router.push("/lobby?role=watcher")}
                        className="group relative h-40 w-full focus:outline-none transition-all active:scale-95 z-10"
                    >
                        {/* Character Image: Full Saturation, Pop-out */}
                        <img
                            src="/landing/watcher.png"
                            alt="Watcher"
                            className="absolute -top-24 right-0 h-60 w-auto z-20 pointer-events-none drop-shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-transform group-hover:scale-110"
                        />

                        {/* Container: Saturated BG, Brutalist skew */}
                        <div className="absolute inset-0 bg-zinc-900 border-2 border-white/20 skew-x-[-6deg] overflow-hidden group-hover:border-accent transition-colors">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-500 scale-110"
                                style={{ backgroundImage: "url('/landing/watcher_background.png')" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                        </div>

                        <div className="relative h-full p-6 flex flex-col justify-end items-start z-10">
                            <div className="text-left">
                                <span className="text-[9px] font-bold text-accent tracking-widest uppercase mb-1 block">PASSIVE_OBSERVER</span>
                                <h2 className="text-4xl font-black uppercase italic text-white leading-none">WATCHER</h2>
                                <p className="text-white/60 text-[8px] mt-2 font-mono tracking-widest">&gt; ACCESS_STREAM_ONLY.EXE</p>
                            </div>
                        </div>
                    </button>

                    {/* PLAYER BOX */}
                    <button
                        onClick={() => router.push("/lobby?role=player")}
                        className="group relative h-40 w-full focus:outline-none transition-all active:scale-95 z-10"
                    >
                        {/* Character Image: Full Saturation, Pop-out */}
                        <img
                            src="/landing/player.png"
                            alt="Player"
                            className="absolute -top-24 right-0 h-60 w-auto z-20 pointer-events-none drop-shadow-[0_0_25px_rgba(255,0,127,0.4)] transition-transform group-hover:scale-110"
                        />

                        {/* Player Frame: Vibrant Magenta */}
                        <div className="absolute -inset-0.5 bg-primary blur-sm opacity-20 group-hover:opacity-40 transition-opacity"></div>
                        <div className="absolute inset-0 bg-zinc-900 border-2 border-primary skew-x-[-6deg] overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-100 transition-opacity duration-500 scale-110"
                                style={{ backgroundImage: "url('/landing/player_background.png')" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                        </div>

                        {/* Corner Accents from Neobrutalism */}
                        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white z-20"></div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white z-20"></div>

                        <div className="relative h-full p-6 flex flex-col justify-end items-start z-10">
                            <div className="text-left">
                                <span className="text-[9px] font-bold text-primary tracking-widest uppercase mb-1 block">LIVE_ACTION</span>
                                <h2 className="text-4xl font-black uppercase italic text-white leading-none drop-shadow-[2px_2px_0px_#FF007F]">PLAYER</h2>
                                <p className="text-white text-[8px] mt-2 font-mono tracking-widest">&gt; INITIATE_SACRIFICE.SH</p>
                            </div>
                        </div>
                    </button>
                </div>
            </main>

            {/* Footer Stats: Neobrutalist Container */}
            <footer className="w-full p-4 z-10 shrink-0">
                <div className="flex border-2 border-white/10 bg-zinc-950 p-4 divide-x-2 divide-white/10 relative overflow-hidden">
                    {/* Tiny Magenta Accent Bar */}
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>

                    <div className="flex-1 px-4">
                        <span className="text-white/40 text-[7px] uppercase font-bold tracking-[0.2em] block">POPULATION</span>
                        <span className="text-xl font-black italic tracking-tighter">14,203</span>
                    </div>
                    <div className="flex-1 px-4 text-right">
                        <span className="text-white/40 text-[7px] uppercase font-bold tracking-[0.2em] block">PRIZE_POOL</span>
                        <span className="text-xl font-black italic tracking-tighter text-primary">$500,000</span>
                    </div>
                </div>
            </footer>

            {/* Add these styles to your global CSS or a <style> tag */}
            <style jsx>{`
                .glitch-text {
                    position: relative;
                    color: white;
                }
                .glitch-text::before, .glitch-text::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                .glitch-text::before {
                    left: 2px;
                    text-shadow: -2px 0 #00f2ff;
                    clip: rect(44px, 450px, 56px, 0);
                    animation: glitch-anim 5s infinite linear alternate-reverse;
                }
                .glitch-text::after {
                    left: -2px;
                    text-shadow: -2px 0 #ff007f;
                    clip: rect(44px, 450px, 56px, 0);
                    animation: glitch-anim2 5s infinite linear alternate-reverse;
                }
                @keyframes glitch-anim {
                    0% { clip: rect(10px, 9999px, 20px, 0); }
                    20% { clip: rect(30px, 9999px, 40px, 0); }
                    40% { clip: rect(50px, 9999px, 60px, 0); }
                    100% { clip: rect(80px, 9999px, 90px, 0); }
                }
                @keyframes glitch-anim2 {
                    0% { clip: rect(80px, 9999px, 90px, 0); }
                    20% { clip: rect(50px, 9999px, 60px, 0); }
                    100% { clip: rect(10px, 9999px, 20px, 0); }
                }
            `}</style>
        </div>
    );
}