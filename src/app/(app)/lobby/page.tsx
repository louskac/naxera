"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { useGame } from "@/context/GameContext";
import { useWatcher } from "@/hooks/useWatcher";
import { cn } from "@/lib/utils";

function LobbyContent() {
    const router = useRouter();
    const { role, user, createChallenge, challenges } = useGame();
    const { pendingVerifications } = useWatcher(); // Use hook

    const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 21, seconds: 59 });
    const [isCreating, setIsCreating] = useState(false);
    const [newChallenge, setNewChallenge] = useState({ title: "", bounty: "", description: "" });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleCreateChallenge = () => {
        if (!newChallenge.title || !newChallenge.bounty) return;
        createChallenge({
            title: newChallenge.title,
            description: newChallenge.description,
            bounty: Number(newChallenge.bounty),
            location: { lat: 34.0522, lng: -118.2437, name: "Downtown Sector" }
        });
        setIsCreating(false);
        setNewChallenge({ title: "", bounty: "", description: "" });
    };

    const isWatcher = role === "watcher";

    return (
        <div className="min-h-screen font-display flex flex-col antialiased text-white relative overflow-hidden bg-background">
            <div className="fixed inset-0 pointer-events-none opacity-60 z-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.07%22/%3E%3C/svg%3E')]"></div>
            <div className="fixed inset-0 scanlines pointer-events-none z-10"></div>
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none z-0"></div>

            {/* Header */}
            <header className="border-b border-primary/20 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
                <div className="flex justify-between items-center p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 border border-primary flex items-center justify-center shadow-[0_0_10px_rgba(255,0,255,0.4)]">
                            <span className="font-mono font-bold text-lg text-primary">N</span>
                        </div>
                        <h1 className="text-xl font-bold uppercase tracking-widest text-white drop-shadow-[0_0_5px_#FF00FF]">
                            {isWatcher ? "Watcher_NET" : "Naxera_02"}
                        </h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-400 uppercase">{user?.name}</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col relative z-20 pb-32">
                {isWatcher ? (
                    // WATCHER VIEW: Issue Board
                    <div className="flex-grow flex flex-col p-4">
                        {/* Jury Duty Alert */}
                        {pendingVerifications.length > 0 && !isCreating && (
                            <div
                                onClick={() => router.push("/watch/jury")}
                                className="bg-red-900/20 border border-red-500/50 p-3 mb-6 flex justify-between items-center cursor-pointer hover:bg-red-900/40 transition-colors animate-pulse-slow"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-black font-bold animate-pulse">
                                        !
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-red-500 text-sm uppercase">Verification Required</h3>
                                        <p className="text-[10px] text-red-300 font-mono">{pendingVerifications.length} agents waiting for payout</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-red-500">chevron_right</span>
                            </div>
                        )}

                        {!isCreating ? (
                            <>
                                <div className="mb-6 flex justify-between items-end">
                                    <div>
                                        <h2 className="text-2xl font-black uppercase text-white mb-1">Live Feed</h2>
                                        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">Active Operations in Sector 4</p>
                                    </div>
                                    <button
                                        onClick={() => setIsCreating(true)}
                                        className="bg-primary text-black text-xs font-bold uppercase px-3 py-2 hover:bg-white transition-colors shadow-[0_0_10px_#FF00FF]"
                                    >
                                        + New Dare
                                    </button>
                                </div>

                                <div className="space-y-4 overflow-y-auto pb-4">
                                    {challenges.map((challenge) => (
                                        <div key={challenge.id} className="bg-surface/50 border border-white/10 p-4 hover:border-primary/50 transition-colors group">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold uppercase text-white group-hover:text-primary transition-colors">{challenge.title}</h3>
                                                <span className="text-primary font-mono text-xs font-bold">${challenge.bounty}</span>
                                            </div>
                                            <p className="text-xs text-gray-400 font-mono mb-3 line-clamp-2">{challenge.description}</p>
                                            <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-500">
                                                <span>{challenge.location.name}</span>
                                                <span className={cn(
                                                    "px-2 py-0.5 border",
                                                    challenge.status === 'active' ? "border-green-500/50 text-green-500 bg-green-500/10" : "border-gray-600"
                                                )}>
                                                    {challenge.status}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <button onClick={() => setIsCreating(false)} className="text-gray-500 hover:text-white mb-4 flex items-center gap-1 text-xs uppercase font-bold">
                                    <span className="material-symbols-outlined text-sm">arrow_back</span> Cancel
                                </button>
                                <h2 className="text-2xl font-black uppercase text-white mb-6">Broadcast Mission</h2>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-primary tracking-widest">Operation Name</label>
                                        <input
                                            value={newChallenge.title}
                                            onChange={(e) => setNewChallenge({ ...newChallenge, title: e.target.value })}
                                            type="text"
                                            placeholder="e.g. Roof Run Alpha"
                                            className="w-full bg-black/50 border border-primary/50 text-white p-3 font-mono text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_10px_#FF00FF]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-primary tracking-widest">Bounty (Credits)</label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-3 text-primary">$</span>
                                            <input
                                                value={newChallenge.bounty}
                                                onChange={(e) => setNewChallenge({ ...newChallenge, bounty: e.target.value })}
                                                type="number"
                                                placeholder="500"
                                                className="w-full bg-black/50 border border-primary/50 text-white p-3 pl-8 font-mono text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_10px_#FF00FF]"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold text-primary tracking-widest">Directives</label>
                                        <textarea
                                            value={newChallenge.description}
                                            onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                                            rows={4}
                                            placeholder="Describe the mission parameters..."
                                            className="w-full bg-black/50 border border-primary/50 text-white p-3 font-mono text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_10px_#FF00FF]"
                                        ></textarea>
                                    </div>

                                    <button
                                        onClick={handleCreateChallenge}
                                        className="w-full mt-6 bg-primary text-black font-black uppercase py-4 shadow-[0_0_15px_#FF00FF] hover:bg-white transition-colors flex items-center justify-center gap-2"
                                    >
                                        Broadcast Mission <span className="material-symbols-outlined">rss_feed</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // PLAYER VIEW: Waiting / Assignment Feed
                    <div className="flex-grow flex flex-col">
                        {/* Countdown Section */}
                        <section className="flex-shrink-0 flex flex-col items-center justify-center p-6 border-b border-primary/10">
                            <div className="w-full max-w-sm text-center">
                                <div className="inline-block bg-white/5 backdrop-blur-md border border-primary/20 px-4 py-1 text-[10px] font-mono uppercase mb-4 text-primary tracking-[0.2em] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                                    Next Drop In
                                </div>
                                <div className="flex items-end justify-center gap-2 md:gap-4 font-mono mb-4 scale-90">
                                    <div className="flex flex-col items-center">
                                        <div className="text-4xl font-black text-white drop-shadow-[0_0_10px_#FF00FF] leading-none">
                                            {timeLeft.hours.toString().padStart(2, '0')}
                                        </div>
                                        <span className="text-[9px] uppercase font-bold text-primary/60 mt-1 tracking-widest">Hrs</span>
                                    </div>
                                    <div className="text-2xl text-primary/50 pb-3 animate-pulse">:</div>
                                    <div className="flex flex-col items-center">
                                        <div className="text-4xl font-black text-white drop-shadow-[0_0_10px_#FF00FF] leading-none">
                                            {timeLeft.minutes.toString().padStart(2, '0')}
                                        </div>
                                        <span className="text-[9px] uppercase font-bold text-primary/60 mt-1 tracking-widest">Min</span>
                                    </div>
                                    <div className="text-2xl text-primary/50 pb-3 animate-pulse">:</div>
                                    <div className="flex flex-col items-center relative">
                                        <div className="text-4xl font-black text-primary drop-shadow-[0_0_10px_#FF00FF] leading-none relative">
                                            {timeLeft.seconds.toString().padStart(2, '0')}
                                        </div>
                                        <span className="text-[9px] uppercase font-bold text-primary/60 mt-1 tracking-widest">Sec</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Player Assignment Feed */}
                        <section className="flex-grow p-4 overflow-y-auto">
                            <h3 className="text-[10px] font-bold uppercase text-gray-500 mb-3 tracking-widest ml-1">Available Assignments</h3>
                            <div className="space-y-4">
                                {challenges.map((challenge) => (
                                    <div key={challenge.id} className="relative group cursor-pointer" onClick={() => router.push("/play/assignment")}>
                                        <div className="absolute inset-0 bg-primary/5 border border-primary/30 skew-x-[-3deg] transition-all group-hover:bg-primary/10 group-hover:border-primary"></div>
                                        <div className="relative p-4 flex justify-between items-center">
                                            <div>
                                                <h4 className="font-bold uppercase text-white text-sm group-hover:text-primary transition-colors">{challenge.title}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] font-mono text-gray-400 uppercase">{challenge.location.name}</span>
                                                    <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                                    <span className="text-[10px] font-mono text-primary font-bold">${challenge.bounty}</span>
                                                </div>
                                            </div>
                                            <span className="material-symbols-outlined text-gray-500 group-hover:text-white transition-colors">chevron_right</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Quick Actions */}
                        <section className="p-4 pt-0">
                            <button
                                onClick={() => router.push("/play/assignment")}
                                className="w-full bg-surface border border-white/20 p-4 group relative overflow-hidden active:scale-[0.98] transition-all"
                            >
                                <div className="flex items-center justify-between relative z-10">
                                    <div className="flex flex-col items-start gap-1">
                                        <span className="text-sm font-bold uppercase text-white tracking-widest">
                                            Open Mission Deck
                                        </span>
                                    </div>
                                    <span className="material-symbols-outlined text-xl text-primary transform group-hover:translate-x-1 transition-transform">
                                        layers
                                    </span>
                                </div>
                            </button>
                        </section>
                    </div>
                )}
            </main>

            {/* Marquee Footer */}
            <div className="fixed bottom-16 left-0 right-0 z-40 bg-black/90 border-t border-primary/50 border-b border-primary/50 py-1 overflow-hidden pointer-events-none">
                <div className="animate-marquee inline-block font-mono text-[10px] text-primary uppercase tracking-[0.25em] drop-shadow-[0_0_4px_#FF00FF] whitespace-nowrap">
          /// SYSTEM ALERT: GLOBAL CHALLENGE INITIATED /// BAD BITCH ENERGY DETECTED /// REMAINING SLOTS: 42 /// CHECK YOUR COMPASS ///
                </div>
            </div>
        </div>
    );
}

export default function LobbyPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-primary font-mono animate-pulse">INITIALIZING...</div>}>
            <LobbyContent />
        </Suspense>
    );
}
