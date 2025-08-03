import React, { FC } from "react";
import FailLottie from "@/components/lotties/FailLottie";
import { cn } from "@/lib/utils";

type CameraLoadingProps = {
    baseStyle: string;
};

const CameraLoading: FC<CameraLoadingProps> = ({ baseStyle }): JSX.Element => {
    return (
        <div
            className={cn(
                "webcam__loading absolute z-40",
                baseStyle,
                "shadow-lg backdrop-blur-md",
            )}
        >
            <div className="border-foreground h-10 w-10 animate-spin rounded-full border-4 border-b-transparent"></div>
            <h4 className="text-foreground font-semibold">
                Chargement de la caméra...
            </h4>
        </div>
    );
};

export default CameraLoading;
