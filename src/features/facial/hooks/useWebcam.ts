import { loadModels } from "@/lib/faceapi";
import { useEffect, useRef, useCallback, useState } from "react";
import * as faceapi from "face-api.js";

const useWebcam = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const isInitializedRef = useRef<boolean>(false);
    const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isLoadingWebcam, setLoadingWebcam] = useState<boolean>(true);
    const [modelsLoaded, setLoadingModel] = useState<boolean>(false);

    const closeWebcam = useCallback(() => {
        if (detectionIntervalRef.current) {
            clearInterval(detectionIntervalRef.current);
            detectionIntervalRef.current = null;
        }

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

    const detectFace = useCallback(() => {
        console.log("Starting face detection");

        if (detectionIntervalRef.current) {
            clearInterval(detectionIntervalRef.current);
        }

        detectionIntervalRef.current = setInterval(async () => {
            if (
                canvasRef.current &&
                videoRef.current &&
                videoRef.current.readyState === 4
            ) {
                const videoWidth = videoRef.current.videoWidth;
                const videoHeight = videoRef.current.videoHeight;

                if (videoWidth === 0 || videoHeight === 0) {
                    console.log("Video dimensions not ready");
                    return;
                }

                const displaySize = {
                    width: videoWidth,
                    height: videoHeight,
                };

                canvasRef.current.width = videoWidth;
                canvasRef.current.height = videoHeight;

                faceapi.matchDimensions(canvasRef.current, displaySize);

                try {
                    const detections = await faceapi
                        .detectAllFaces(
                            videoRef.current,
                            new faceapi.TinyFaceDetectorOptions(),
                        )
                        .withFaceLandmarks()
                        .withFaceExpressions();

                    const resizedDetections = faceapi.resizeResults(
                        detections,
                        displaySize,
                    );

                    const ctx = canvasRef.current.getContext("2d");
                    if (ctx) {
                        ctx.clearRect(
                            0,
                            0,
                            displaySize.width,
                            displaySize.height,
                        );

                        if (resizedDetections.length > 0) {
                            faceapi.draw.drawFaceLandmarks(
                                canvasRef.current,
                                resizedDetections,
                            );
                        }

                        if (resizedDetections.length > 0) {
                            console.log("face detected");
                        }
                    }
                } catch (error) {
                    console.error("Error during face detection:", error);
                }
            }
        }, 240);
    }, [modelsLoaded]);

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
                            console.log("Video started playing");
                            isInitializedRef.current = true;

                            if (modelsLoaded) {
                                setTimeout(() => {
                                    setLoadingWebcam(false);
                                }, 500);
                            }
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
    }, [modelsLoaded]);

    useEffect(() => {
        const loadFaceapiModels = async () => {
            try {
                await loadModels(() => {
                    setLoadingModel(true);
                });
            } catch (error) {
                console.error("Error loading models:", error);
                setLoadingWebcam(false);
            }
        };

        loadFaceapiModels();
    }, []);

    useEffect(() => {
        if (modelsLoaded) {
            startVideo();
        }

        return () => {
            closeWebcam();
        };
    }, [modelsLoaded, startVideo, closeWebcam]);

    useEffect(() => {
        if (!isLoadingWebcam && modelsLoaded && isInitializedRef.current) {
            const timer = setTimeout(() => {
                detectFace();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isLoadingWebcam, modelsLoaded]);

    return {
        canvasRef,
        videoRef,
        streamRef,
        isLoadingWebcam,
        modelsLoaded,
        detectFace,
    };
};

export default useWebcam;
