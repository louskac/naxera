"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useGame } from "@/context/GameContext";

export default function BottomNav() {
    const pathname = usePathname();
    const router = useRouter();
    const { role } = useGame();
    const isWatcher = role === "watcher";

    const navItems = [
        {
            label: "Base",
            path: "/lobby",
            icon: "home",
            activeColor: "text-white"
        },
        {
            label: isWatcher ? "Zones" : "Map",
            path: "/play/mission",
            icon: isWatcher ? "explore" : "map",
            activeColor: "text-white"
        },
        {
            label: isWatcher ? "Drop" : "Play",
            path: isWatcher ? "/play/mission" : "/play/assignment", // Watcher drops on map, Player sees assignment
            icon: isWatcher ? "add_location_alt" : "play_arrow",
            isFab: true
        },
        {
            label: isWatcher ? "Invest" : "List",
            path: "/leaderboard",
            icon: "leaderboard",
            activeColor: "text-white"
        },
        {
            label: isWatcher ? "Identity" : "Profile",
            path: "/profile",
            icon: isWatcher ? "visibility" : "person",
            activeColor: "text-white"
        },
    ];

    return (
        <nav className="fixed bottom-0 w-full bg-black/90 backdrop-blur-lg border-t border-gray-800 p-2 z-[70] pb-safe">
            <div className="flex justify-around items-center max-w-lg mx-auto relative">
                {navItems.map((item, index) => {
                    const isActive = pathname === item.path;

                    if (item.isFab) {
                        return (
                            <div key={index} className="relative -top-6">
                                <button
                                    onClick={() => router.push(item.path)}
                                    className={cn(
                                        "w-16 h-16 bg-black border-2 rounded-full flex items-center justify-center transition-all shadow-[0_0_20px_rgba(255,0,153,0.3)] hover:scale-105",
                                        isWatcher
                                            ? "border-green-500 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_25px_#00FF00]"
                                            : "border-primary shadow-[0_0_20px_rgba(255,0,153,0.3)] hover:shadow-[0_0_25px_#FF0099]"
                                    )}
                                >
                                    <span className={cn(
                                        "material-symbols-outlined text-3xl",
                                        isWatcher ? "text-green-500" : "text-primary"
                                    )}>{item.icon}</span>
                                </button>
                            </div>
                        );
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => router.push(item.path)}
                            className="flex flex-col items-center p-2 group transition-colors"
                        >
                            <span className={cn(
                                "material-symbols-outlined text-2xl transition-all",
                                isActive
                                    ? (isWatcher ? "text-green-500 drop-shadow-[0_0_5px_#00FF00]" : "text-primary drop-shadow-[0_0_5px_#FF00FF]")
                                    : "text-gray-600 group-hover:text-gray-300"
                            )}>
                                {item.icon}
                            </span>
                            <span className={cn(
                                "text-[10px] font-mono font-bold mt-1 uppercase transition-colors",
                                isActive ? "text-white" : "text-gray-600 group-hover:text-gray-400"
                            )}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
