import React, { FC } from "react";
import FailLottie from "@/components/lotties/FailLottie";
import { cn } from "@/lib/utils";

type ErrorProps = {
    baseStyle: string;
};

const FacialError: FC<ErrorProps> = ({ baseStyle }): JSX.Element => {
    return (
        <div
            className={cn(
                "webcam__unknow relative z-50 p-6",
                baseStyle,
                "border-2 border-red-500 shadow-xl",
            )}
        >
            <FailLottie />
            <div className="texts flex flex-col items-center space-y-3 text-center">
                <h4 className="text-lg font-bold text-red-600">
                    Un erreur s'est produit
                </h4>
            </div>
        </div>
    );
};

export default FacialError;
