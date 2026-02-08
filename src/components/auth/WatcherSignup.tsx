"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

export default function WatcherSignup({ onClose }: { onClose: () => void }) {
    const { signup, isLoading } = useUser();
    const [username, setUsername] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signup("watcher", { username });
            onClose();
        } catch (error) {
            alert("Signup failed: " + (error as Error).message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border-2 border-accent p-8 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white/50 hover:text-white"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <h2 className="text-3xl font-black italic uppercase mb-2 text-white">
                    Watcher <span className="text-accent">Access</span>
                </h2>
                <p className="text-xs font-mono text-white/60 mb-6">
                    &gt; OBSERVE. VOTE. FUND.
                </p>

                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-accent block mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black border border-white/20 p-3 text-white font-bold focus:border-accent focus:outline-none"
                            placeholder="e.g. Eye_In_Sky"
                            required
                        />
                    </div>

                    <div className="bg-accent/10 border border-accent/30 p-3 mb-4">
                        <p className="text-[10px] text-accent font-mono">
                            ℹ A secure wallet will be created to manage your voting credits.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-accent hover:bg-white hover:text-accent text-zinc-900 font-black italic uppercase text-xl py-4 transition-all disabled:opacity-50"
                    >
                        {isLoading ? "Connecting..." : "Connect Stream"}
                    </button>
                </form>
            </div>
        </div>
    );
}
