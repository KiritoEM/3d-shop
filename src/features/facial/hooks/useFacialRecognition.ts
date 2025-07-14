"use client";

import { useEffect, useRef, useState } from "react";
import { AdminFacialRecognition } from "@prisma/client";
import { loadModels } from "@/lib/faceapi";
import useWebcam from "./useWebcam";
import useFaceDetection from "./useFaceDetection";
import { useAuthentificationStatus } from "./useAuthentificationStatus";

const useFacialRecognition = (
    facialData: AdminFacialRecognition[],
    isLoadingFaces: boolean,
) => {
    const isLoadingFacesRef = useRef<boolean>(isLoadingFaces);
    const [modelsLoaded, setLoadingModel] = useState<boolean>(false);
    const { setAuthStatus, sessionCreated } = useAuthentificationStatus();

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

    const onRecognizedFace = async () => {
        setAuthStatus("Authentificated");
    };

    const onUnknowFace = async () => {
        setAuthStatus("Unknow");
    };

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
        detectFace,
    };
};
export default useFacialRecognition;
