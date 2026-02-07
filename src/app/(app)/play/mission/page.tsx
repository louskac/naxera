"use client";

import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function MissionPage() {
    const router = useRouter();
    const { role, challenges } = useGame();
    const isWatcher = role === "watcher";
    const [clickEffect, setClickEffect] = useState<{ x: number, y: number } | null>(null);

    const handleMapClick = (e: React.MouseEvent) => {
        if (!isWatcher) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setClickEffect({ x, y });
        setTimeout(() => setClickEffect(null), 1000);
    };

    return (
        <div className="bg-black text-white font-display h-screen overflow-hidden flex flex-col relative selection:bg-primary selection:text-black">
            {/* Background with pattern */}
            <div
                className="absolute inset-0 bg-[#0a0a0a] bg-[radial-gradient(#FF00FF_1.5px,transparent_1.5px)] bg-[size:24px_24px] opacity-30 pointer-events-none"
            ></div>

            {/* Header */}
            <header className="w-full bg-[#050505] text-white p-4 border-b border-primary/30 z-20 flex justify-between items-center shrink-0 shadow-[0_4px_20px_rgba(255,0,255,0.15)] relative">
                <div className="flex items-center gap-3">
                    <div className="bg-black w-8 h-8 flex items-center justify-center border border-primary rounded-none font-bold text-primary text-sm shadow-[2px_2px_0px_#FF00FF]">
                        N
                    </div>
                    <span className="font-bold tracking-widest text-lg italic uppercase drop-shadow-[2px_2px_0px_#FF00FF]">
                        {isWatcher ? "OVERWATCH" : "NAXERA"}
                    </span>
                </div>
                <div className="flex gap-4 text-xs font-mono font-bold items-center">
                    <div className={cn(
                        "flex items-center gap-1 bg-black border px-2 py-1",
                        isWatcher ? "border-green-500/50 text-green-500" : "border-primary/50 text-primary"
                    )}>
                        <span className="material-symbols-outlined text-sm">{isWatcher ? "visibility" : "bolt"}</span>
                        <span>{isWatcher ? "GOD MODE" : "100%"}</span>
                    </div>
                </div>
            </header>

            {/* AI HUD Overlay - Top Left */}
            <div className="absolute top-20 left-4 z-10 flex flex-col gap-3 w-48 pointer-events-none">
                <div className="bg-black/90 backdrop-blur-sm border border-primary shadow-[4px_4px_0px_#FF00FF] p-4 pointer-events-auto">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-[10px] font-black uppercase text-primary tracking-widest animate-pulse">
                            {isWatcher ? "SECTOR SCAN" : "AI SCANNING"}
                        </h3>
                        <span className="w-2 h-2 bg-primary rounded-full animate-ping"></span>
                    </div>
                    <p className="font-bold text-xl leading-none uppercase italic">Zone: Riot</p>
                    <div className="w-full bg-gray-800 h-1 mt-3 relative">
                        <div className="bg-primary h-full w-4/5 absolute top-0 left-0 shadow-[0_0_10px_#FF00FF]"></div>
                    </div>
                    <p className="text-[10px] mt-1 text-right font-mono text-gray-400">Analysis: 89%</p>
                </div>
                {!isWatcher && (
                    <div className="bg-primary text-black border border-white shadow-[2px_2px_0px_#FFF] p-2 flex items-center gap-2 justify-between pointer-events-auto">
                        <span className="font-black text-sm uppercase italic">Boost Active</span>
                        <span className="bg-black text-primary text-[10px] px-1 font-mono font-bold">04:20</span>
                    </div>
                )}
            </div>

            {/* Controls Overlay - Top Right */}
            <div className="absolute top-20 right-4 z-10">
                <div className="flex flex-col gap-4">
                    <button className="bg-black w-10 h-10 flex items-center justify-center border border-primary shadow-[3px_3px_0px_#FF00FF] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all group">
                        <span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform">layers</span>
                    </button>
                    {isWatcher && (
                        <button className="bg-black w-10 h-10 flex items-center justify-center border border-green-500 shadow-[3px_3px_0px_#00FF00] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all group">
                            <span className="material-symbols-outlined text-green-500 text-lg group-hover:scale-110 transition-transform">add_location_alt</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Main Gameplay Area (Map Simulation) */}
            <main
                className={cn(
                    "flex-grow relative overflow-hidden",
                    isWatcher ? "cursor-crosshair" : "cursor-default"
                )}
                onClick={handleMapClick}
            >
                {/* Map Elements */}
                <div className="absolute top-1/2 left-0 w-full h-8 bg-black/40 -translate-y-1/2 rotate-12 border-y border-primary/20 pointer-events-none"></div>
                <div className="absolute top-0 left-1/3 w-20 h-full bg-black/40 skew-x-12 border-x border-primary/20 pointer-events-none"></div>

                {/* Click Effect for Watcher */}
                {clickEffect && (
                    <div
                        className="absolute w-20 h-20 rounded-full border-2 border-green-500 animate-ping pointer-events-none z-50"
                        style={{ top: clickEffect.y - 40, left: clickEffect.x - 40 }}
                    ></div>
                )}

                {/* Mission Pins */}
                {challenges.map((challenge, i) => (
                    <div
                        key={challenge.id}
                        className="absolute p-1 border border-primary bg-black shadow-[4px_4px_0px_rgba(255,0,255,0.5)] flex items-center justify-center text-primary font-bold text-2xl -rotate-3 hover:scale-110 transition-transform cursor-pointer z-10"
                        style={{ top: `${30 + (i * 20)}%`, left: `${25 + (i * 15)}%` }} // Simple offset for viz
                    >
                        <div className="w-12 h-12 flex items-center justify-center bg-primary/20" title={challenge.title}>
                            <span className="material-symbols-outlined">local_police</span>
                        </div>
                    </div>
                ))}

                {/* Player Location Marker (Only for Player or if Watcher is tracking) */}
                {!isWatcher && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
                        <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping delay-75"></div>
                        <div className="absolute inset-[-10px] bg-primary/10 rounded-full animate-ping"></div>
                        <div className="relative w-16 h-16 bg-black border-2 border-primary rounded-full flex items-center justify-center shadow-[0_0_20px_#FF00FF] z-10">
                            <span className="material-symbols-outlined text-3xl text-primary animate-pulse">navigation</span>
                        </div>
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[30px] border-l-transparent border-b-[60px] border-b-primary/30 border-r-[30px] border-r-transparent blur-sm"></div>
                    </div>
                )}

                {/* Watcher "God View" Markers - simulated other players */}
                {isWatcher && (
                    <>
                        <div className="absolute top-[40%] left-[60%] w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
                        <div className="absolute top-[70%] left-[20%] w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
                        <div className="absolute top-[20%] left-[80%] w-4 h-4 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div>
                    </>
                )}

                {/* Alert Marker */}
                <div className="absolute top-1/4 right-12 w-10 h-10 bg-white border border-primary rotate-45 flex items-center justify-center shadow-[0_0_10px_#FF00FF] animate-bounce z-10">
                    <span className="material-symbols-outlined text-primary -rotate-45 font-bold">priority_high</span>
                </div>
            </main>

            {/* Footer / HUD */}
            <footer className="bg-black border-t border-primary/30 p-6 pb-20 relative z-30">
                {/* Center Button */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                    <button className={cn(
                        "w-20 h-20 rounded-full bg-black border-4 shadow-[0_0_25px_#FF00FF] flex items-center justify-center hover:scale-105 active:scale-95 transition-all group ring-4 ring-black",
                        isWatcher ? "border-green-500 shadow-[0_0_25px_#00FF00]" : "border-primary"
                    )}>
                        <span className={cn(
                            "material-symbol-outlined text-4xl group-hover:text-white transition-colors",
                            isWatcher ? "text-green-500 material-symbols-outlined" : "text-primary material-symbols-outlined"
                        )}>
                            {isWatcher ? "add" : "photo_camera"}
                        </span>
                    </button>
                </div>

                <div className="flex justify-between items-end h-full pt-2">
                    <div className="flex gap-4 items-center">
                        <div className="flex flex-col items-center gap-1 cursor-pointer group">
                            <div className="w-12 h-12 bg-[#111] border border-gray-600 group-hover:border-primary rounded-none shadow-[2px_2px_0px_#333] group-hover:shadow-[2px_2px_0px_#FF00FF] flex items-center justify-center transition-all">
                                <span className={cn("material-symbols-outlined text-gray-400", isWatcher ? "group-hover:text-green-500" : "group-hover:text-primary")}>
                                    {isWatcher ? "explore" : "inventory_2"}
                                </span>
                            </div>
                            <span className={cn("text-[9px] font-bold uppercase tracking-wider text-gray-500", isWatcher ? "group-hover:text-green-500" : "group-hover:text-primary")}>
                                {isWatcher ? "Zones" : "Stash"}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        {!isWatcher && (
                            <div className="bg-primary/20 text-primary px-2 py-1 text-[10px] font-bold font-mono border border-primary/50 animate-pulse">
                                PROXIMITY ALERT
                            </div>
                        )}
                        <div className="bg-black border border-white/20 px-4 py-2 shadow-[2px_2px_0px_#333]">
                            <div className="flex flex-col items-end">
                                <span className={cn("text-sm font-black italic drop-shadow-[0_0_5px_#FF00FF]", isWatcher ? "text-green-500" : "text-primary")}>
                                    {isWatcher ? "GLOBAL VIEW" : "STREAK"} {isWatcher ? "" : <span className="text-white not-italic ml-1">12x</span>}
                                </span>
                                <span className="text-[10px] uppercase text-gray-500 tracking-widest">
                                    {isWatcher ? "Monitoring 42 Agents" : "Multiplier Active"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
