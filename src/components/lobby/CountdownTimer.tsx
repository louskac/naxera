"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
    const [timeLeft, setTimeLeft] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                setTimeLeft({
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                clearInterval(interval);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const pad = (num: number) => num.toString().padStart(2, "0");

    return (
        <div className="flex items-end justify-center gap-2 md:gap-4 font-mono scale-110 mb-12">
            <div className="flex flex-col items-center group">
                <div className="text-5xl md:text-8xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] leading-none group-hover:text-neon transition-colors duration-300">
                    {pad(timeLeft.hours)}
                </div>
                <span className="text-[10px] md:text-xs uppercase font-bold text-gray-500 mt-2 tracking-[0.2em]">Hrs</span>
            </div>
            <div className="text-3xl md:text-6xl text-gray-600 pb-4 animate-pulse">:</div>
            <div className="flex flex-col items-center group">
                <div className="text-5xl md:text-8xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] leading-none group-hover:text-neon transition-colors duration-300">
                    {pad(timeLeft.minutes)}
                </div>
                <span className="text-[10px] md:text-xs uppercase font-bold text-gray-500 mt-2 tracking-[0.2em]">Min</span>
            </div>
            <div className="text-3xl md:text-6xl text-gray-600 pb-4 animate-pulse">:</div>
            <div className="flex flex-col items-center group relative">
                <div className="text-5xl md:text-8xl font-black text-neon drop-shadow-[0_0_15px_#FF00FF] leading-none relative">
                    {pad(timeLeft.seconds)}
                    {/* Glitch overlays - functional CSS implementation */}
                    <span className="absolute top-0 left-[2px] text-red-500 opacity-50 mix-blend-screen animate-pulse pointer-events-none">{pad(timeLeft.seconds)}</span>
                    <span className="absolute top-0 -left-[2px] text-neon-cyan opacity-50 mix-blend-screen animate-pulse pointer-events-none">{pad(timeLeft.seconds)}</span>
                </div>
                <span className="text-[10px] md:text-xs uppercase font-bold text-neon/60 mt-2 tracking-[0.2em]">Sec</span>
            </div>
        </div>
    );
}
