"use client";

import { AdminFacialRecognition } from "@prisma/client";
import SuccessLottie from "@/components/lotties/SuccessLottie";
import FailLottie from "@/components/lotties/FailLottie";
import { cn } from "@/lib/utils";
import useFacialRecognition from "../hooks/useFacialRecognition";
import { useEffect, useState, useTransition } from "react";
import { getAllFaces } from "../actions/facial-actions";

const Webcam = (): JSX.Element => {
    const [isPending, startTransition] = useTransition();
    const [facesData, setFacesData] = useState<AdminFacialRecognition[]>([]);

    useEffect(() => {
        const fetchFacesData = () => {
            startTransition(async () => {
                const allFaces = await getAllFaces();
                setFacesData(allFaces);
            });
        };
        fetchFacesData();
    }, []);

    const { canvasRef, videoRef, isLoadingWebcam, authentificationStatus } =
        useFacialRecognition(facesData, isPending);

    const BASE_STYLE_CONTAINER =
        "flex h-full w-full flex-col items-center justify-center space-y-4 rounded-lg bg-input dark:bg-[#262626]";

    return (
        <div className="webcam relative mt-4 flex !h-[360px] w-full items-center justify-center p-0">
            {/* Loading State */}
            {isLoadingWebcam && authentificationStatus === "Pending" && (
                <div
                    className={cn(
                        "webcam__loading absolute z-40",
                        BASE_STYLE_CONTAINER,
                        "shadow-lg backdrop-blur-md",
                    )}
                >
                    <div className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-b-transparent"></div>
                    <h4 className="text-primary font-semibold">
                        Chargement de la caméra...
                    </h4>
                </div>
            )}

            {/* Success State */}
            {!isLoadingWebcam &&
                authentificationStatus === "Authentificated" && (
                    <div
                        className={cn(
                            "webcam__authentificated relative z-50",
                            BASE_STYLE_CONTAINER,
                            "border-2 border-green-500 shadow-xl",
                        )}
                    >
                        <SuccessLottie style={{ height: "7em" }} />
                        <h4 className="text-lg font-bold text-green-600">
                            Authentifié avec succès
                        </h4>
                    </div>
                )}

            {/* Failure State */}
            {!isLoadingWebcam && authentificationStatus === "Unknow" && (
                <div
                    className={cn(
                        "webcam__unknow relative z-50 p-6",
                        BASE_STYLE_CONTAINER,
                        "border-2 border-red-500 shadow-xl",
                    )}
                >
                    <FailLottie />
                    <div className="texts flex flex-col items-center space-y-3 text-center">
                        <h4 className="text-lg font-bold text-red-600">
                            Individu non reconnu
                        </h4>
                        <p className="text-foreground/80 text-sm">
                            Veuillez vous assurer que vous avez accès à la
                            reconnaissance faciale, c&apos;est-à-dire que votre
                            photo est bien ajoutée dans la base de données.
                        </p>
                    </div>
                </div>
            )}

            {/* Video Preview */}
            <video
                ref={videoRef}
                className={cn(
                    "!h-full !w-full rounded-lg object-cover transition-all duration-500",
                    isLoadingWebcam && "scale-95 opacity-0 blur-sm",
                    authentificationStatus !== "Pending" && "hidden",
                )}
                muted
                playsInline
            />

            {/* Canvas Overlay */}
            <canvas
                ref={canvasRef}
                className={cn(
                    "output_canvas pointer-events-none absolute left-0 top-0 !h-full !w-full rounded-lg transition-all duration-500",
                    authentificationStatus !== "Pending" && "hidden",
                )}
                style={{ height: "100%", objectFit: "cover" }}
            />
        </div>
    );
};

export default Webcam;
