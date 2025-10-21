"use client";

import { useEffect, useState, useTransition } from "react";
import { AdminFacialRecognition, AdminInfo } from "@prisma/client";
import { createSession } from "@/lib/sessions/dbSession";
import { useRouter } from "next/navigation";
import Camera from "@/components/webcam/Camera";
import { cn } from "@/lib/utils";
import useFacialRecognition from "../../hooks/useFacialRecognition";
import { getAdminById, getAllFaces } from "../../actions/facialActions";
import { useAuthentificationStatus } from "../../store/authStatus";
import FacialError from "./Error";
import FacialSuccess from "./Success";
import CameraLoading from "./CameraLoading";
import FacialUnknown from "./Unknown";

const BASE_STYLE_CONTAINER =
    "flex h-full w-full flex-col items-center justify-center space-y-4 rounded-lg bg-input dark:bg-[#262626]";

const Webcam = (): JSX.Element => {
    const [facesData, setFacesData] = useState<AdminFacialRecognition[]>([]);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { authStatus, facialId, sessionCreated, setSessionState } =
        useAuthentificationStatus();
    const { canvasRef, videoRef, isLoadingWebcam } = useFacialRecognition(
        facesData,
        isPending,
    );

    //fetching all faces
    useEffect(() => {
        const fetchFacesData = () => {
            startTransition(async () => {
                const allFaces = await getAllFaces();
                setFacesData(allFaces);
            });
        };
        fetchFacesData();

        return () => setFacesData([]);
    }, [getAllFaces]);

    //fetching admin info when face detected, create session and redirection
    useEffect(() => {
        if (authStatus === "Authentificated") {
            const fetchInfoAndCreateSession = async () => {
                const adminInfo = (await getAdminById(facialId!)) as AdminInfo;

                if (adminInfo) {
                    await createSession(
                        { method: "FACIAL_RECOGNITION" },
                        adminInfo.id,
                    )
                        .then(() => {
                            setSessionState("Created");
                            router.replace("/admin/dashboard");
                        })
                        .catch(() => {
                            setSessionState("Error");
                        });
                }
            };

            fetchInfoAndCreateSession();
        }
    }, [authStatus]);

    return (
        <div className="webcam relative mt-4 flex !h-[360px] w-full items-center justify-center p-0">
            {/* Error handling */}
            {!isLoadingWebcam &&
                authStatus !== "Pending" &&
                sessionCreated === "Error" && (
                    <FacialError baseStyle={BASE_STYLE_CONTAINER} />
                )}

            {/* Loading State */}
            {isLoadingWebcam &&
                authStatus === "Pending" &&
                sessionCreated === "Pending" && (
                    <CameraLoading baseStyle={BASE_STYLE_CONTAINER} />
                )}

            {/* Success State */}
            {!isLoadingWebcam &&
                authStatus === "Authentificated" &&
                sessionCreated && (
                    <FacialSuccess baseStyle={BASE_STYLE_CONTAINER} />
                )}

            {/* Failure State */}
            {!isLoadingWebcam &&
                authStatus === "Unknow" &&
                sessionCreated !== "Pending" && (
                    <FacialUnknown baseStyle={BASE_STYLE_CONTAINER} />
                )}

            {/* Video Preview */}
            <Camera
                ref={videoRef}
                cameraClass={[
                    "!h-full !w-full rounded-lg object-cover transition-all duration-500",
                    isLoadingWebcam ? "scale-95 opacity-0 blur-sm" : "",
                    authStatus !== "Pending" ? "hidden" : "",
                ]}
            />

            {/* Canvas Overlay */}
            <canvas
                ref={canvasRef}
                className={cn(
                    "output_canvas pointer-events-none absolute left-0 top-0 !h-full !w-full rounded-lg transition-all duration-500",
                    authStatus !== "Pending" && "hidden",
                )}
                style={{ height: "100%", objectFit: "cover" }}
            />
        </div>
    );
};

export default Webcam;
