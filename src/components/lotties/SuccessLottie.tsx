"use client";

import { FC } from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

type SuccessLottieProps = {
    style?: Record<string, string>;
};

const SuccessLottie: FC<SuccessLottieProps> = ({
    style = { height: "8em" },
}): JSX.Element => {
    return (
        <DotLottiePlayer
            loop
            autoplay
            src="/lotties/success.lottie"
            background="transparent"
            className="w-full cursor-pointer"
            style={{ objectFit: "cover", width: "100%", ...style }}
        />
    );
};

export default SuccessLottie;
