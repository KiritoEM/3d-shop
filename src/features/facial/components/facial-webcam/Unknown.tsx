import React, { FC } from "react";
import FailLottie from "@/components/lotties/FailLottie";
import { cn } from "@/lib/utils";

type UnknownProps = {
    baseStyle: string;
};

const FacialUnknown: FC<UnknownProps> = ({ baseStyle }): JSX.Element => {
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
                    Individu non reconnu
                </h4>
                <p className="text-foreground/80 text-sm">
                    Veuillez vous assurer que vous avez accès à la
                    reconnaissance faciale, c&apos;est-à-dire que votre photo
                    est bien ajoutée dans la base de données.
                </p>
            </div>
        </div>
    );
};

export default FacialUnknown;
