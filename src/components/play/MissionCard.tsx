"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"; // Assuming utility exists, if not using clsx pattern

// simple clsx replacement
function classNames(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

interface MissionCardProps {
    id: number;
    title: string;
    description: string;
    reward: number;
    difficulty: "Easy" | "Medium" | "Hard";
}

export default function MissionCard({ id, title, description, reward, difficulty }: MissionCardProps) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className="group relative w-full h-80perspective-1000 cursor-pointer"
            onClick={() => setFlipped(!flipped)}
        >
            <div
                className={classNames(
                    "relative w-full h-full text-center transition-transform duration-700 transform-style-3d",
                    flipped ? "rotate-y-180" : ""
                )}
            >
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden bg-surface border border-white/20 flex flex-col items-center justify-center p-6 shadow-neon-sm hover:shadow-neon hover:border-neon transition-all">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center mb-6 group-hover:border-neon group-hover:animate-spin-slow">
                        <span className="material-icons text-3xl text-gray-400 group-hover:text-neon">lock</span>
                    </div>
                    <h3 className="text-2xl font-display uppercase font-bold text-gray-500 group-hover:text-white transition-colors">
                        Mission {id}
                    </h3>
                    <p className="text-[10px] uppercase font-mono tracking-widest text-[#555] mt-2 group-hover:text-neon-cyan">
                        Click to Decrypt
                    </p>
                </div>

                {/* Back */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-black border border-neon flex flex-col items-center justify-between p-6 shadow-[0_0_20px_#FF00FF]">
                    <div className="w-full flex justify-between items-start border-b border-white/10 pb-2">
                        <span className={classNames(
                            "text-[10px] font-bold uppercase px-2 py-0.5",
                            difficulty === 'Hard' ? 'bg-red-500 text-white' : difficulty === 'Medium' ? 'bg-yellow-500 text-black' : 'bg-green-500 text-black'
                        )}>
                            {difficulty}
                        </span>
                        <span className="text-neon font-mono font-bold">${reward}</span>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                        <h3 className="font-display uppercase text-xl font-bold leading-tight mb-2 text-white glitch-text">
                            {title}
                        </h3>
                        <p className="font-mono text-xs text-gray-400 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <button className="w-full bg-neon text-black font-bold uppercase py-2 text-sm hover:bg-white transition-colors shadow-lg mt-4">
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
}
