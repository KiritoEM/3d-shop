"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import * as faceapi from "face-api.js";
import { AdminFacialRecognition } from "@prisma/client";
import { compareFace, handleLabelFace, loadModels } from "@/lib/faceapi";
import { createSession } from "@/lib/session";
import { useRouter } from "next/navigation";

type IAuthStatus = "Authentificated" | "Unknow" | "Pending";

const useFacialRecognition = (
    facialData: AdminFacialRecognition[],
    isLoadingFaces: boolean,
) => {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const isInitializedRef = useRef<boolean>(false);
    const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isLoadingWebcam, setLoadingWebcam] = useState<boolean>(true);
    const [modelsLoaded, setLoadingModel] = useState<boolean>(false);
    const isLoadingFacesRef = useRef<boolean>(isLoadingFaces);
    const [authentificationStatus, setAuthentificationStatus] =
        useState<IAuthStatus>("Pending");

    useEffect(() => {
        isLoadingFacesRef.current = isLoadingFaces;
    }, [isLoadingFaces]);

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
                    const detection = await faceapi
                        .detectSingleFace(
                            videoRef.current,
                            new faceapi.TinyFaceDetectorOptions(),
                        )
                        .withFaceLandmarks()
                        .withFaceDescriptor();

                    const resizedDetection = detection
                        ? faceapi.resizeResults(detection, displaySize)
                        : undefined;

                    const ctx = canvasRef.current.getContext("2d");
                    if (ctx) {
                        ctx.clearRect(
                            0,
                            0,
                            displaySize.width,
                            displaySize.height,
                        );

                        if (resizedDetection) {
                            faceapi.draw.drawFaceLandmarks(
                                canvasRef.current,
                                resizedDetection,
                            );
                        }

                        if (resizedDetection && !isLoadingFacesRef.current) {
                            if (!facialData || facialData.length === 0) {
                                setTimeout(() => {
                                    setAuthentificationStatus("Unknow");
                                    return;
                                }, 660);
                            }

                            try {
                                const LabeledFaceDescriptors =
                                    await handleLabelFace(
                                        facialData.map((fd) => ({
                                            image: fd.image,
                                            username: fd.adminId,
                                        })),
                                    );

                                const results = await compareFace(
                                    LabeledFaceDescriptors,
                                    resizedDetection.descriptor,
                                );

                                setTimeout(async () => {
                                    if (results.label !== "unknown") {
                                        setAuthentificationStatus(
                                            "Authentificated",
                                        );
                                        await createSession({
                                            method: "FACIAL_RECOGNITION",
                                        });
                                        router.replace("/admin/statistics");
                                    } else {
                                        setAuthentificationStatus("Unknow");
                                    }

                                    closeWebcam();
                                }, 565);
                            } catch (labelError) {
                                console.error(
                                    "Error processing face labels:",
                                    labelError,
                                );
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error during face detection:", error);
                }
            }
        }, 100);
    }, [facialData, modelsLoaded]);

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
            if (detectionIntervalRef.current) {
                clearInterval(detectionIntervalRef.current);
                detectionIntervalRef.current = null;
            }

            const timer = setTimeout(() => {
                detectFace();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isLoadingWebcam, modelsLoaded, isLoadingFaces, detectFace]);

    return {
        canvasRef,
        videoRef,
        streamRef,
        isLoadingWebcam,
        modelsLoaded,
        authentificationStatus,
        detectFace,
    };
};

export default useFacialRecognition;
