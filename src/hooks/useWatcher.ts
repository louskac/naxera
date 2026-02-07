"use client";

import { useState } from "react";
import { useGame } from "@/context/GameContext";
import { Challenge, VerificationRequest } from "@/lib/types";

// Mock Data for Jury
const MOCK_VERIFICATIONS: VerificationRequest[] = [
    {
        challengeId: "ch_001",
        submittedBy: "p_001 (Ghost_Protocol)",
        status: "pending",
        evidence: {
            id: "ev_001",
            type: "image",
            url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWmCSFT4Kqi0GIr6uDLHdGMqquYYiIUGqrhTgbe4SbOXrsysinPN_X0r-NP6W3enrD165ha82leJLXip2NDHebyLv4ujdecEALUT_B-Uu-kKShlsjvVTIS-CylMUT9aZDj6Ewr9aRcevdGmGwvMAnSc6bmDP8NIj6u9NrEkxSwb3cCv9OSDyA_RQh0ot0CdYdEMaBHbeiAa_ePPxwfCsKxCrnrTdau1p-uJE2ald46_X0vOx1zUsJr0oAdlUkstwAggifwVLJxpGk",
            timestamp: new Date(),
            aiConfidence: 94
        },
        votes: { approvals: 3, rejections: 0 }
    }
];

export function useWatcher() {
    const { user, role, createChallenge } = useGame();
    const [pendingVerifications, setPendingVerifications] = useState<VerificationRequest[]>(MOCK_VERIFICATIONS);
    const [myVotes, setMyVotes] = useState<Record<string, 'approve' | 'reject'>>({});

    const isWatcher = role === 'watcher';

    const broadcastMission = (missionData: { title: string, bounty: number, description: string, location: any }) => {
        if (!isWatcher) return;
        createChallenge({
            title: missionData.title,
            description: missionData.description,
            bounty: missionData.bounty,
            location: missionData.location,
        });
        // In real app, deduct credits from user
    };

    const voteOnverification = (challengeId: string, vote: 'approve' | 'reject') => {
        if (!isWatcher) return;

        // Optimistic update
        setMyVotes(prev => ({ ...prev, [challengeId]: vote }));

        // Remove from pending list after short delay to simulate "Next Case"
        setTimeout(() => {
            setPendingVerifications(prev => prev.filter(v => v.challengeId !== challengeId));
        }, 1000);

        console.log(`Watcher ${user?.id} voted ${vote} on ${challengeId}`);
    };

    const boostOperative = (operativeId: string, amount: number) => {
        if (!isWatcher) return;
        console.log(`Watcher ${user?.id} boosted ${operativeId} with $${amount}`);
        // In real app, deduct credits and update Global State
    };

    return {
        isWatcher,
        pendingVerifications,
        myVotes,
        broadcastMission,
        voteOnverification,
        boostOperative
    };
}
