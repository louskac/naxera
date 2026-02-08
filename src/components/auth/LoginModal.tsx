"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

export default function LoginModal({ onClose }: { onClose: () => void }) {
    const { loginWithWallet, isLoading } = useUser();
    const [address, setAddress] = useState("");
    const [privateKey, setPrivateKey] = useState(""); // Optional for dev

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await loginWithWallet(address, privateKey);
            onClose();
        } catch (error) {
            alert("Login failed: " + (error as Error).message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border-2 border-white/20 p-8 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white/50 hover:text-white"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <h2 className="text-2xl font-black italic uppercase mb-6 text-white">
                    Identity <span className="text-primary">Verification</span>
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/60 block mb-1">
                            Wallet Address
                        </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-primary focus:outline-none"
                            placeholder="Solana Address..."
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-mono uppercase tracking-widest text-white/60 block mb-1">
                            Private Key (Optional / Dev)
                        </label>
                        <input
                            type="password"
                            value={privateKey}
                            onChange={(e) => setPrivateKey(e.target.value)}
                            className="w-full bg-black border border-white/20 p-3 text-white font-mono focus:border-primary focus:outline-none"
                            placeholder="******"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-white hover:text-primary text-white font-bold uppercase tracking-widest py-4 transition-all disabled:opacity-50"
                    >
                        {isLoading ? "Verifying..." : "Access System"}
                    </button>
                </form>
            </div>
        </div>
    );
}
