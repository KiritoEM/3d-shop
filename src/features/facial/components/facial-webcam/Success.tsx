import React, { FC } from "react";
import SuccessLottie from "@/components/lotties/SuccessLottie";

import { cn } from "@/lib/utils";

type SuccessProps = {
    baseStyle: string;
};

const FacialSuccess: FC<SuccessProps> = ({ baseStyle }): JSX.Element => {
    return (
        <div
            className={cn(
                "webcam__authentificated relative z-50",
                baseStyle,
                "border-2 border-green-500 shadow-xl",
            )}
        >
            <SuccessLottie style={{ height: "7em" }} />
            <h4 className="text-lg font-bold text-green-600">
                Authentifié avec succès
            </h4>
        </div>
    );
};

export default FacialSuccess;
