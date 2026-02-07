"use client";

import { useEffect, useState } from "react";

export default function EvidenceUpload({ file, onComplete }: { file: Blob; onComplete: () => void }) {
    const [steps, setSteps] = useState([
        { id: 1, label: "Analyzing Metadata", status: "pending" },
        { id: 2, label: "Verifying Liveness (3D Map)", status: "pending" },
        { id: 3, label: "Checking Geolocation", status: "pending" },
        { id: 4, label: "Deepfake Detection", status: "pending" },
    ]);

    useEffect(() => {
        let currentStep = 0;
        const interval = setInterval(() => {
            setSteps((prev) =>
                prev.map((step, index) => {
                    if (index === currentStep) return { ...step, status: "active" };
                    if (index < currentStep) return { ...step, status: "completed" };
                    return step;
                })
            );

            if (currentStep > 3) {
                clearInterval(interval);
                setTimeout(onComplete, 1000); // Finish after checks
            }
            currentStep++;
        }, 1200);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div className="w-full bg-surface border border-white/10 p-6 shadow-neon-sm animate-in fade-in zoom-in duration-300">
            <h3 className="font-display uppercase text-lg text-white mb-4 border-b border-white/20 pb-2 flex justify-between">
                <span>AI Verification Protocol</span>
                <span className="text-neon animate-pulse text-xs self-center">PROCESSING</span>
            </h3>

            <div className="space-y-4">
                {steps.map((step) => (
                    <div key={step.id} className="flex items-center gap-4 text-xs font-mono uppercase tracking-wide">
                        <div className="w-4 flex flex-col items-center">
                            {step.status === 'completed' ? (
                                <span className="material-icons text-green-500 text-sm">check</span>
                            ) : step.status === 'active' ? (
                                <div className="w-3 h-3 rounded-full border-2 border-t-neon border-r-transparent animate-spin"></div>
                            ) : (
                                <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                            )}
                        </div>
                        <span className={`${step.status === 'active' ? 'text-white font-bold' : step.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                            {step.label}
                        </span>
                        {step.status === 'active' && <span className="text-neon font-bold ml-auto">{Math.floor(Math.random() * 99)}%</span>}
                    </div>
                ))}
            </div>

            <div className="mt-6 w-full h-1 bg-gray-800 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-neon w-full origin-left animate-[progress_5s_ease-out_forwards]"></div>
            </div>
        </div>
    );
}
