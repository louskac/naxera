"use client";

import { useGame } from "@/context/GameContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ProfilePage() {
    const { role, user } = useGame();
    const isWatcher = role === "watcher";

    // Mock data for profile
    const stats = isWatcher ? [
        { label: "Total Fund", value: "$45,200" },
        { label: "Boosts", value: "128" },
        { label: "Success Rate", value: "94%" },
    ] : [
        { label: "Missions", value: "42" },
        { label: "Success Rate", value: "98%" },
        { label: "XP", value: "1.4M" },
    ];

    return (
        <div className="min-h-screen bg-black text-white font-display pb-24 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=%2240%22 height=%2240%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h40v40H0z%22 fill=%22%23000%22 fill-rule=%22evenodd%22/%3E%3Cpath d=%22M0 40L40 0H20L0 20M40 40V20L20 40%22 fill=%22%23222%22 fill-rule=%22evenodd%22/%3E%3C/svg%3E')]"></div>

            {/* Header */}
            <header className="relative z-20 p-6 flex justify-between items-start border-b border-primary/20 bg-black/80 backdrop-blur-md">
                <div>
                    <h1 className="text-3xl font-black uppercase text-white drop-shadow-[2px_2px_0px_#FF00FF]">
                        {isWatcher ? "ANONYMOUS" : "OPERATIVE_FILE"}
                    </h1>
                    <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-1">
                        ID: {user?.id || "UNK-001"} // STATUS: ACTIVE
                    </p>
                </div>
                <div className={cn(
                    "px-3 py-1 border text-xs font-bold uppercase tracking-widest",
                    isWatcher ? "border-green-500 text-green-500" : "border-primary text-primary"
                )}>
                    {isWatcher ? "Watcher" : "Player"}
                </div>
            </header>

            <main className="p-6 relative z-10 space-y-8">
                {/* Avatar / Identity Section */}
                <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                        <div className={cn(
                            "w-32 h-32 bg-black border-2 flex items-center justify-center overflow-hidden",
                            isWatcher ? "border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.3)]" : "border-primary shadow-[0_0_20px_rgba(255,0,255,0.3)]"
                        )}>
                            {isWatcher ? (
                                <span className="material-symbols-outlined text-6xl text-green-500 animate-pulse">visibility</span>
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                                    <span className="material-symbols-outlined text-6xl text-primary">person</span>
                                </div>
                            )}
                        </div>
                        {/* Decorators */}
                        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-white"></div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-white"></div>
                    </div>

                    <h2 className="text-2xl font-bold uppercase tracking-widest text-center">
                        {user?.name || "Unknown_User"}
                    </h2>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="h-2 w-24 bg-gray-800 rounded-full overflow-hidden">
                            <div className={cn("h-full w-3/4 rounded-full", isWatcher ? "bg-green-500" : "bg-primary")}></div>
                        </div>
                        <span className="text-[10px] font-mono text-gray-400">LVL {isWatcher ? "5" : "12"}</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-2">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-3 flex flex-col items-center text-center hover:border-primary/50 transition-colors">
                            <span className={cn(
                                "text-lg font-black font-mono",
                                isWatcher ? "text-green-400" : "text-primary"
                            )}>
                                {stat.value}
                            </span>
                            <span className="text-[9px] uppercase font-bold text-gray-500 tracking-wider mt-1">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* Content based on Role */}
                {isWatcher ? (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase text-white border-b border-gray-800 pb-2">Recent Investments</h3>
                        <div className="space-y-2">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex justify-between items-center bg-black border border-green-900/30 p-3 hover:border-green-500 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-500/10 flex items-center justify-center text-green-500 font-bold text-xs rounded-full">
                                            <span className="material-symbols-outlined text-sm">trending_up</span>
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-white uppercase">Boost: Player_0{i + 4}</div>
                                            <div className="text-[10px] text-gray-500 font-mono">2h ago • Sector 4</div>
                                        </div>
                                    </div>
                                    <span className="text-green-400 font-mono font-bold text-sm">+$500</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase text-white border-b border-gray-800 pb-2">Skill Matrix</h3>
                        <div className="space-y-3">
                            {[
                                { name: "Agility", val: "80%" },
                                { name: "Stealth", val: "65%" },
                                { name: "Hacking", val: "92%" }
                            ].map((skill, i) => (
                                <div key={i} className="space-y-1">
                                    <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400">
                                        <span>{skill.name}</span>
                                        <span>{skill.val}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-800">
                                        <div
                                            className="h-full bg-primary shadow-[0_0_5px_#FF00FF]"
                                            style={{ width: skill.val }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-sm font-bold uppercase text-white border-b border-gray-800 pb-2 mt-6">Mission Log</h3>
                        <div className="space-y-2">
                            {[1, 2].map((_, i) => (
                                <div key={i} className="flex justify-between items-center bg-black border border-white/10 p-3 opacity-70 hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                            <span className="material-symbols-outlined text-sm">check</span>
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-white uppercase">Op: Nightfall</div>
                                            <div className="text-[10px] text-gray-500 font-mono">Complete • +500XP</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
