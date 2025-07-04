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
            {isLoadingWebcam && authentificationStatus === "Pending" && (
                <div
                    className={cn(
                        "webcam__loading absolute z-40",
                        BASE_STYLE_CONTAINER,
                    )}
                >
                    <div className="h-7 w-7 animate-spin rounded-full border-b-2 border-current"></div>
                    <h4>Chargement de la camera...</h4>
                </div>
            )}

            {!isLoadingWebcam &&
                authentificationStatus === "Authentificated" && (
                    <div
                        className={cn(
                            "webcam__authentificated relative z-50",
                            BASE_STYLE_CONTAINER,
                        )}
                    >
                        <SuccessLottie style={{ height: "6.5em" }} />
                        <h4 className="text-lg">Authentifié avec succés</h4>
                    </div>
                )}

            {!isLoadingWebcam && authentificationStatus === "Unknow" && (
                <div
                    className={cn(
                        "webcam__unknow relative z-50 p-6",
                        BASE_STYLE_CONTAINER,
                    )}
                >
                    <FailLottie />

                    <div className="texts flex flex-col items-center space-y-3 text-center">
                        <h4 className="text-lg">Individu non reconnu</h4>
                        <p className="text-foreground/80 text-sm">
                            Veuillez vous assurer que vous avez accès à la
                            reconnaissance faciale, c'est-à-dire que votre photo
                            est bien ajoutée dans la base de données.
                        </p>
                    </div>
                </div>
            )}

            <video
                ref={videoRef}
                className={cn(
                    "!h-full !w-full rounded-lg object-cover",
                    isLoadingWebcam && "opacity-0",
                    authentificationStatus !== "Pending" && "hidden",
                )}
                muted
                playsInline
            />

            <canvas
                ref={canvasRef}
                className={cn(
                    "output_canvas absolute left-0 top-0 !h-full !w-full rounded-lg",
                    authentificationStatus !== "Pending" && "hidden",
                )}
                style={{ height: "100%", objectFit: "cover" }}
            />
        </div>
    );
};

export default Webcam;
