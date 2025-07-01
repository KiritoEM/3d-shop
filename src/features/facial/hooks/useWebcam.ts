import { useEffect, useRef, useCallback, useState } from "react";

const useWebcam = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
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
    }, [videoRef.current]);

    const startVideo = useCallback(async () => {
        if (isInitializedRef.current || !videoRef.current) {
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });

            if (!videoRef.current) {
                stream.getTracks().forEach((track) => track.stop());
                return;
            }

            streamRef.current = stream;
            videoRef.current.srcObject = stream;

            videoRef.current.onloadedmetadata = () => {
                if (videoRef.current && !isInitializedRef.current) {
                    videoRef.current.play().catch((error) => {
                        console.error("Error playing video:", error);
                    });
                    isInitializedRef.current = true;
                    setTimeout(() => {
                        setLoadingWebcam(false);
                    }, 600);
                }
            };
        } catch (err) {
            console.error("Error accessing camera:", err);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            startVideo();
        }, 100);

        return () => {
            clearTimeout(timer);
            closeWebcam();
        };
    }, []);

    console.log(isLoadingWebcam);

    return {
        videoRef,
        streamRef,
        isLoadingWebcam,
    };
};

export default useWebcam;
