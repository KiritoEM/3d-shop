"use client";

import { useEffect, useRef, useState } from "react";
import { AdminFacialRecognition } from "@prisma/client";
import { loadModels } from "@/lib/faceapi";
import { createSession } from "@/lib/session";
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
    const [modelsLoaded, setLoadingModel] = useState<boolean>(false);
    const [authentificationStatus, setAuthentificationStatus] =
        useState<IAuthStatus>("Pending");

    const onRecognizedFace = async () => {
        setAuthentificationStatus("Authentificated");
        await createSession({
            method: "FACIAL_RECOGNITION",
        });
        router.replace("/admin/statistics");
    };

    const onUnknowFace = async () => {
        setAuthentificationStatus("Unknow");
    };

    //Webcam custom hook
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

    //Face_detection custom hook
    const { detectFace, stopDetection } = useFaceDetection(
        facialData,
        videoRef,
        canvasRef,
        isLoadingFacesRef,
        closeWebcam,
        onRecognizedFace,
        onUnknowFace,
    );

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
