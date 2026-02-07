"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Role, Challenge } from "@/lib/types";

interface GameContextType {
    user: User | null;
    role: Role;
    challenges: Challenge[];
    switchRole: (role: Role) => void;
    createChallenge: (challenge: Omit<Challenge, "id" | "status" | "createdBy" | "expiresAt">) => void;
    acceptChallenge: (challengeId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const DUMMY_USER: User = {
    id: "user_001",
    name: "Neon_Operator",
    role: "player",
    credits: 1000,
    xp: 4500,
    impactScore: 0,
};

const INITIAL_CHALLENGES: Challenge[] = [
    {
        id: "ch_001",
        title: "Roof Run Alpha",
        description: "Locate the hidden QR tag on top of the old factory.",
        bounty: 500,
        location: { lat: 34.0522, lng: -118.2437, name: "Sector 4 Factory" },
        status: "active",
        createdBy: "watcher_99",
        expiresAt: new Date(Date.now() + 3600000), // 1 hour from now
    },
    {
        id: "ch_002",
        title: "Night Drop",
        description: "Deliver the package to the dead drop without being seen.",
        bounty: 1200,
        location: { lat: 34.0407, lng: -118.2468, name: "Downtown Alley" },
        status: "pending",
        createdBy: "watcher_x",
        expiresAt: new Date(Date.now() + 7200000),
    },
];

export function GameProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(DUMMY_USER);
    const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);

    // Persist role via localStorage for dev convenience, default to player
    // In a real app, this would come from auth/database
    const [role, setRole] = useState<Role>("player");
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeGame = async () => {
            // Check if role is in URL or localStorage on mount
            const searchParams = new URLSearchParams(window.location.search);
            const urlRole = searchParams.get("role") as Role;

            if (urlRole && (urlRole === "player" || urlRole === "watcher")) {
                setRole(urlRole);
            } else {
                const storedRole = localStorage.getItem("naxera_role") as Role;
                if (storedRole) setRole(storedRole);
            }

            // Wallet Initialization
            let walletData = null;
            const storedWallet = localStorage.getItem("naxera_wallet");

            if (storedWallet) {
                walletData = JSON.parse(storedWallet);
                console.log("✅ Loaded wallet:", walletData.address);
            } else {
                try {
                    console.log("⚡ Creating new Solana identity...");
                    const res = await fetch("/api/wallet/create", { method: "POST" });
                    const data = await res.json();

                    if (data.success) {
                        walletData = data;
                        localStorage.setItem("naxera_wallet", JSON.stringify(data));
                        console.log("✅ Generated wallet:", data.address);

                        // Auto-mint profile for new users
                        // registerProfile(data.address); 
                    }
                } catch (e) {
                    console.error("Failed to create wallet:", e);
                }
            }

            if (walletData && user) {
                setUser(prev => prev ? { ...prev, walletAddress: walletData.address, role } : null);
            }

            setIsInitialized(true);
        };

        initializeGame();
    }, []);

    useEffect(() => {
        if (!isInitialized) return;
        localStorage.setItem("naxera_role", role);
    }, [role, isInitialized]);

    const registerProfile = async (address: string) => {
        try {
            await fetch("/api/profile/mint", {
                method: "POST",
                body: JSON.stringify({
                    address,
                    metadata: { nickname: user?.name || "Anon", bio: "Naxera Agent", avatar: "http://via.placeholder.com/150" }
                })
            });
        } catch (e) {
            console.error("Minting failed", e);
        }
    };

    const switchRole = (newRole: Role) => {
        setRole(newRole);
    };

    const createChallenge = (data: Omit<Challenge, "id" | "status" | "createdBy" | "expiresAt">) => {
        const newChallenge: Challenge = {
            ...data,
            id: `ch_${Date.now()}`,
            status: "active",
            createdBy: user?.id || "anon",
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h default
        };
        setChallenges((prev) => [newChallenge, ...prev]);
    };

    const acceptChallenge = (challengeId: string) => {
        setChallenges(prev => prev.map(c =>
            c.id === challengeId ? { ...c, status: "active", assignedTo: user?.id } : c
        ));
    };

    return (
        <GameContext.Provider value={{ user, role, challenges, switchRole, createChallenge, acceptChallenge }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error("useGame must be used within a GameProvider");
    }
    return context;
}
