"use client";
import { useState, useRef, useEffect } from "react";
import { useUser } from "@/context/UserContext";

export default function PlayerSignup({ onClose }: { onClose: () => void }) {
    const { signup, isLoading } = useUser();
    const [nickname, setNickname] = useState("");
    const [bio, setBio] = useState("");

    // Webcam State
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isStreamActive, setIsStreamActive] = useState(false);
    const [streamError, setStreamError] = useState<string | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);

    // Clean up camera on unmount
    useEffect(() => {
        return () => stopCamera();
    }, []);

    const startCamera = async () => {
        console.log("[PlayerSignup] startCamera called.");
        setStreamError(null);
        try {
            console.log("[PlayerSignup] Requesting navigator.mediaDevices.getUserMedia...");
            // Request camera
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 300, height: 300, facingMode: "user" }
            });
            console.log("[PlayerSignup] Camera access granted. Stream ID:", stream.id);

            // Assign stream to video element
            // NOTE: Video element is now always rendered (but hidden), so ref should exist.
            if (videoRef.current) {
                console.log("[PlayerSignup] Setting video srcObject.");
                videoRef.current.srcObject = stream;

                // Explicitly play for Safari/Mobile compatibility
                try {
                    await videoRef.current.play();
                    console.log("[PlayerSignup] video.play() successful");
                } catch (playErr) {
                    console.warn("[PlayerSignup] video.play() failed:", playErr);
                }

                setIsStreamActive(true);
            } else {
                console.error("[PlayerSignup] CRITICAL: videoRef.current is null! Stream obtained but cannot display.");
                setStreamError("Internal Error: Video element not found.");
            }
        } catch (err) {
            console.error("[PlayerSignup] Error accessing webcam:", err);
            const errorMsg = (err as Error).name === "NotAllowedError"
                ? "Permission denied. Click 'Enable Feed' to retry."
                : "Camera error. Check device settings.";
            setStreamError(errorMsg);
        }
    };

    const stopCamera = () => {
        console.log("[PlayerSignup] stopCamera called.");
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsStreamActive(false);
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext("2d");
            if (context) {
                // Flip the canvas context so the saved image matches the mirrored preview
                context.save();
                context.translate(300, 0);
                context.scale(-1, 1);
                context.drawImage(videoRef.current, 0, 0, 300, 300);
                context.restore();

                const imageDataUrl = canvasRef.current.toDataURL("image/jpeg", 0.8);
                setCapturedImage(imageDataUrl);
                stopCamera();
            }
        }
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        // Manual restart required by user interaction design, or we can auto-trigger here since they already consented?
        // Let's stick to the manual button for consistency unless we want to auto-open.
        // But for UX, if I click Retake, I probably want the camera back immediately.
        // However, to be safe with permissions, let's just reset state and let them click "Enable Feed" or auto-trigger?
        // Let's force them to click "Enable Feed" again to be 100% safe against "Auto-play" blocks, 
        // ALTHOUGH since it's a click handler on "Retake", we COULD call startCamera().
        // Let's leave it manual for now to avoid complexity or errors.
        setIsStreamActive(false);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!capturedImage) {
                alert("Identity verification required. Please capture your photo.");
                return;
            }
            // "player" role hardcoded
            await signup("player", { nickname, bio, avatar: capturedImage });
            onClose();
        } catch (error) {
            alert("Signup failed: " + (error as Error).message);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="bg-zinc-900 border-2 border-primary p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white/50 hover:text-white"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>

                <h2 className="text-2xl font-black italic uppercase mb-2 text-white">
                    Player <span className="text-primary">Contract</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mt-4">
                    {/* Left Column: Camera */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-[200px] h-[200px] bg-black border-2 border-primary/50 overflow-hidden mb-3 flex items-center justify-center">
                            {/* Hidden Canvas for capture */}
                            <canvas ref={canvasRef} width="300" height="300" className="hidden"></canvas>

                            {/* Video Element - ALWAYS RENDERED to ensure ref exists, but hidden via CSS if inactive */}
                            <video
                                ref={videoRef}
                                playsInline
                                muted
                                className={`w-full h-full object-cover transform scale-x-[-1] absolute inset-0 ${(!isStreamActive || capturedImage) ? 'invisible' : 'visible'}`}
                            />

                            {/* Placeholders / Captured Image State */}
                            {capturedImage ? (
                                <img src={capturedImage} alt="Captured" className="w-full h-full object-cover z-10 relative" />
                            ) : (
                                !isStreamActive && (
                                    <div className="text-center p-4 z-10 relative">
                                        <div className="material-symbols-outlined text-4xl text-white/20 mb-2">videocam_off</div>
                                        <p className="text-[10px] text-white/40">Camera Inactive</p>
                                    </div>
                                )
                            )}

                            {/* Overlay UI */}
                            <div className="absolute inset-0 pointer-events-none border-[1px] border-primary/30 z-20">
                                {isStreamActive && !capturedImage && (
                                    <div className="absolute top-2 left-2 text-[8px] text-primary/80 font-mono animate-pulse">REC ●</div>
                                )}
                                {/* Corner markers */}
                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary"></div>
                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary"></div>
                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary"></div>
                            </div>
                        </div>

                        {streamError && (
                            <p className="text-[10px] text-red-500 font-mono mb-2 text-center max-w-[200px]">{streamError}</p>
                        )}

                        {!capturedImage ? (
                            !isStreamActive ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        console.log("[PlayerSignup] 'Enable Feed' button clicked.");
                                        startCamera();
                                    }}
                                    className="px-4 py-2 bg-primary/20 border border-primary hover:bg-primary hover:text-white text-primary text-xs font-mono uppercase tracking-widest transition-all"
                                >
                                    [ Enable Feed ]
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={capturePhoto}
                                    className="px-4 py-2 bg-zinc-800 border border-white/20 hover:border-primary text-white text-xs font-mono uppercase tracking-widest transition-all animate-pulse"
                                >
                                    [ Capture ID ]
                                </button>
                            )
                        ) : (
                            <button
                                type="button"
                                onClick={retakePhoto}
                                className="px-4 py-2 bg-zinc-800 border border-white/20 hover:text-red-400 text-white/60 text-xs font-mono uppercase tracking-widest transition-all"
                            >
                                [ Retake ]
                            </button>
                        )}
                        <p className="text-[9px] text-white/40 mt-2 text-center max-w-[200px]">
                            Biometric scan required for operative verification. Permission may be requested.
                        </p>
                    </div>

                    {/* Right Column: Form */}
                    <form onSubmit={handleSignup} className="space-y-4 flex flex-col justify-center">
                        <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-primary block mb-1">
                                Operative Codename
                            </label>
                            <input
                                type="text"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                className="w-full bg-black border border-white/20 p-2 text-white font-bold text-sm focus:border-primary focus:outline-none"
                                placeholder="e.g. Ghost_01"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-mono uppercase tracking-widest text-white/60 block mb-1">
                                Mission Statement
                            </label>
                            <textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="w-full bg-black border border-white/20 p-2 text-sm text-white focus:border-primary focus:outline-none h-20 resize-none"
                                placeholder="I do what others won't."
                            />
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/10">
                            <button
                                type="submit"
                                disabled={isLoading || !capturedImage}
                                className="w-full bg-primary hover:bg-white hover:text-primary text-white font-black italic uppercase text-lg py-3 transition-all disabled:opacity-50 disabled:grayscale"
                            >
                                {isLoading ? "Processing..." : "INITIATE"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
