"use client";

import { useEffect, useRef, useState } from "react";
import { AdminFacialRecognition } from "@prisma/client";
import { loadModels } from "@/lib/faceapi";
import { useRouter } from "next/navigation";
import useWebcam from "./useWebcam";
import useFaceDetection from "./useFaceDetection";

export type IAuthStatus = "Authentificated" | "Unknow" | "Pending";

const useFacialRecognition = (
    facialData: AdminFacialRecognition[],
    isLoadingFaces: boolean,
) => {
    const router = useRouter();
    const isLoadingFacesRef = useRef<boolean>(isLoadingFaces);

    const handleAuthResult = (status: IAuthStatus) => {
        setAuthentificationStatus(status);
    };

    const {
        videoRef,
        canvasRef,
        streamRef,
        isInitializedRef,
        isLoadingWebcam,
        setLoadingWebcam,
        closeWebcam,
        startVideo,
    } = useWebcam();

    const { detectFace, stopDetection } = useFaceDetection(
        facialData,
        isLoadingFaces,
        router,
        videoRef,
        canvasRef,
        isLoadingFacesRef,
        handleAuthResult,
        closeWebcam,
    );

    const [modelsLoaded, setLoadingModel] = useState<boolean>(false);
    const [authentificationStatus, setAuthentificationStatus] =
        useState<IAuthStatus>("Pending");

    useEffect(() => {
        isLoadingFacesRef.current = isLoadingFaces;
    }, [isLoadingFaces]);

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
            stopDetection();

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
