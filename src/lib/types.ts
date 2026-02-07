export type Role = 'watcher' | 'player';

export interface User {
    id: string;
    name: string;
    role: Role;
    avatar?: string;
    impactScore?: number; // Total amount funded for watchers
    xp?: number; // Experience points for players
    credits: number;
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    bounty: number;
    location: {
        lat: number;
        lng: number;
        name: string;
    };
    status: 'active' | 'pending' | 'completed' | 'expired';
    createdBy: string; // Watcher ID
    assignedTo?: string; // Player ID
    expiresAt: Date;
    verificationEvidence?: Evidence;
}

export interface Evidence {
    id: string;
    type: 'image' | 'video' | 'location';
    url: string;
    timestamp: Date;
    aiConfidence: number; // 0-100
}

export interface VerificationRequest {
    challengeId: string;
    submittedBy: string; // Player ID
    evidence: Evidence;
    status: 'pending' | 'approved' | 'rejected';
    votes: {
        approvals: number;
        rejections: number;
    };
}

export interface Transaction {
    id: string;
    from: string;
    to: string;
    amount: number;
    timestamp: Date;
    type: 'fund' | 'payout' | 'boost';
}
