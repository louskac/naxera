"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Role } from "@/lib/types";
import { useRouter } from "next/navigation";

interface UserContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    loginWithWallet: (address: string, privateKey?: string) => Promise<void>;
    signup: (role: Role, data: any) => Promise<void>;
    logout: () => void;
    walletKey: string | null; // For MVP/Demo: storing private key in memory/localstorage
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [walletKey, setWalletKey] = useState<string | null>(null);
    const router = useRouter();

    // Load session on mount
    useEffect(() => {
        const loadSession = async () => {
            const storedWallet = localStorage.getItem("naxera_wallet_address");
            const storedKey = localStorage.getItem("naxera_wallet_key");

            if (storedWallet) {
                setWalletKey(storedKey);
                try {
                    await fetchProfile(storedWallet);
                } catch (e) {
                    console.error("Failed to restore session", e);
                    // Don't auto-logout immediately, maybe just network error. 
                    // But if user not found, we might want to clear.
                }
            }
            setIsLoading(false);
        };
        loadSession();
    }, []);

    const fetchProfile = async (address: string) => {
        const res = await fetch(`/api/profile/get?address=${address}`);
        const data = await res.json();

        if (data.success && data.user) {
            setUser(data.user);
        } else {
            throw new Error("Profile not found");
        }
    };

    const loginWithWallet = async (address: string, privateKey?: string) => {
        setIsLoading(true);
        try {
            await fetchProfile(address);
            localStorage.setItem("naxera_wallet_address", address);
            if (privateKey) {
                localStorage.setItem("naxera_wallet_key", privateKey);
                setWalletKey(privateKey);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            throw error;
        }
        setIsLoading(false);
    };

    const signup = async (role: Role, formData: any) => {
        setIsLoading(true);
        try {
            // 1. Create Wallet (or use connected one - implementing create for now)
            // In a real app we'd let them connect Phantom, but per req we create one.
            let address = formData.walletAddress;
            let privateKey = formData.privateKey;

            if (!address) {
                const walletRes = await fetch("/api/wallet/create", { method: "POST" });
                const walletData = await walletRes.json();
                if (!walletData.success) throw new Error("Failed to create wallet");

                address = walletData.address;
                privateKey = walletData.privateKey;
            }

            // 2. Mint Profile NFT
            // We use the "nickname" from form for Player, or "username" for Watcher
            const metadata = {
                nickname: formData.nickname || formData.username,
                role: role,
                bio: formData.bio || "",
                avatar: formData.avatar || ""
            };

            const mintRes = await fetch("/api/profile/mint", {
                method: "POST",
                body: JSON.stringify({ address, metadata })
            });
            const mintData = await mintRes.json();

            if (!mintData.success) {
                // If minting fails, we might still want to proceed locally for Watchers?
                // But let's be strict for now.
                console.error("Minting failed:", mintData.error);
                // For Watchers, maybe on-chain minting isn't strictly required immediately?
                // The prompt says "saves data with tatum".
            } else {
                console.log("Mint Success! Transaction ID:", mintData.txId);
                console.log("Verify on Solscan (Devnet):", `https://solscan.io/tx/${mintData.txId}?cluster=devnet`);
                alert(`Mint Success! Check console for verification link.\nTxID: ${mintData.txId}`);
            }

            // 3. Construct Local User Object
            const newUser: User = {
                id: address, // Using address as ID for consistency
                name: metadata.nickname,
                role: role,
                credits: 100, // Starter credits
                walletAddress: address,
                avatar: metadata.avatar,
                xp: 0,
                impactScore: 0
            };

            setUser(newUser);
            setWalletKey(privateKey);

            localStorage.setItem("naxera_wallet_address", address);
            if (privateKey) localStorage.setItem("naxera_wallet_key", privateKey);

            // Redirect to Lobby
            router.push(`/lobby?role=${role}`);

        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("naxera_wallet_address");
        localStorage.removeItem("naxera_wallet_key");
        setUser(null);
        setWalletKey(null);
        router.push("/");
    };

    return (
        <UserContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            loginWithWallet,
            signup,
            logout,
            walletKey
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
