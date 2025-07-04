"use client";

import { useCallback, useRef } from "react";
import * as faceapi from "face-api.js";
import { compareFace, handleLabelFace } from "@/lib/faceapi";
import { createSession } from "@/lib/session";
import { AdminFacialRecognition } from "@prisma/client";
import { IAuthStatus } from "./useFacialRecognition";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const useFaceDetection = (
    facialData: AdminFacialRecognition[],
    isLoadingFaces: boolean,
    router: AppRouterInstance,
    videoRef: React.RefObject<HTMLVideoElement | null>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    isLoadingFacesRef: React.RefObject<boolean>,
    onAuthenticationResult: (status: IAuthStatus) => void,
    closeWebcam: () => void,
) => {
    const detectionIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
                                    onAuthenticationResult("Unknow");
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
                                        onAuthenticationResult(
                                            "Authentificated",
                                        );
                                        await createSession({
                                            method: "FACIAL_RECOGNITION",
                                        });
                                        router.replace("/admin/statistics");
                                    } else {
                                        onAuthenticationResult("Unknow");
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
    }, [facialData]);

    const stopDetection = () => {
        if (detectionIntervalRef.current) {
            clearInterval(detectionIntervalRef.current);
            detectionIntervalRef.current = null;
        }
    };

    return {
        detectFace,
        stopDetection,
        isLoadingFaces,
    };
};

export default useFaceDetection;
