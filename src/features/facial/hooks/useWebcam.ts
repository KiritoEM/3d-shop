"use client";

import { useCallback, useRef, useState } from "react";

const useWebcam = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const isInitializedRef = useRef<boolean>(false);
    const [isLoadingWebcam, setLoadingWebcam] = useState<boolean>(true);

    const closeWebcam = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => {
                track.stop();
            });
            streamRef.current = null;
        }

        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.srcObject = null;
        }

        isInitializedRef.current = false;
    }, []);

    const startVideo = useCallback(async () => {
        if (isInitializedRef.current || !videoRef.current) {
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                },
            });

            if (!videoRef.current) {
                stream.getTracks().forEach((track) => track.stop());
                return;
            }

            streamRef.current = stream;
            videoRef.current.srcObject = stream;

            videoRef.current.onloadedmetadata = () => {
                if (videoRef.current && !isInitializedRef.current) {
                    videoRef.current
                        .play()
                        .then(() => {
                            isInitializedRef.current = true;

                            setTimeout(() => {
                                setLoadingWebcam(false);
                            }, 500);
                        })
                        .catch((error) => {
                            console.error("Error playing video:", error);
                        });
                }
            };
        } catch (err) {
            console.error("Error accessing camera:", err);
            setLoadingWebcam(false);
        }
    }, []);

    return {
        videoRef,
        canvasRef,
        streamRef,
        isInitializedRef,
        isLoadingWebcam,
        setLoadingWebcam,
        closeWebcam,
        startVideo,
    };
};

export default useWebcam;
