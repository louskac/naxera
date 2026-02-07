"use client";

import { useState, useRef, useEffect } from "react";

export default function CameraView({ onCapture }: { onCapture: (blob: Blob) => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [recording, setRecording] = useState(false);

    useEffect(() => {
        // In a real app, we'd request camera access.
        // For this demo, we'll placeholder or try to access if available, but fail gracefully to a placeholder.
        async function setupCamera() {
            try {
                const ms = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setStream(ms);
                if (videoRef.current) {
                    videoRef.current.srcObject = ms;
                }
            } catch (err) {
                console.error("Camera access denied or unavailable", err);
            }
        }
        setupCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        }
    }, []);

    const handleRecordToggle = () => {
        setRecording(!recording);
        if (!recording) {
            // Simulate recording stop and capture after 3 seconds for demo
            setTimeout(() => {
                setRecording(false);
                onCapture(new Blob(["fake-video-content"], { type: "video/mp4" })); // Mock blob
            }, 3000);
        }
    };

    return (
        <div className="relative w-full h-[60vh] bg-black border-2 border-white/20 overflow-hidden shadow-neon-sm rounded-sm">
            {/* Video feed / Placeholder */}
            {stream ? (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform scale-x-[-1]" />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-gray-500">
                    <span className="material-icons text-5xl mb-2">videocam_off</span>
                    <p className="font-mono text-xs uppercase tracking-widest">Camera Offline</p>
                </div>
            )}

            {/* UI Overlays */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${recording ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}></div>
                        <span className="font-mono text-xs text-white uppercase drop-shadow-md">
                            {recording ? 'REC 00:03' : 'STBY'}
                        </span>
                    </div>
                    <div className="flex flex-col items-end text-[10px] font-mono text-white/70 uppercase">
                        <span>ISO 800</span>
                        <span>1/60</span>
                        <span>F2.8</span>
                    </div>
                </div>

                {/* Crosshair */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-white/30 opacity-50">
                    <div className="absolute top-1/2 left-0 w-2 h-[1px] bg-white"></div>
                    <div className="absolute top-1/2 right-0 w-2 h-[1px] bg-white"></div>
                    <div className="absolute top-0 left-1/2 w-[1px] h-2 bg-white"></div>
                    <div className="absolute bottom-0 left-1/2 w-[1px] h-2 bg-white"></div>
                </div>

                <div className="w-full flex justify-center pointer-events-auto">
                    <button
                        onClick={handleRecordToggle}
                        className={`w-16 h-16 rounded-full border-4 ${recording ? 'border-red-500' : 'border-white'} flex items-center justify-center bg-black/20 backdrop-blur-sm hover:scale-105 transition-transform`}
                    >
                        <div className={`w-12 h-12 rounded-full ${recording ? 'bg-red-500 rounded-sm' : 'bg-white'} transition-all duration-200`}></div>
                    </button>
                </div>
            </div>

            {/* Scanlines Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
        </div>
    );
}
