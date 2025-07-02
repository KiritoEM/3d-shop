"use client";

import { FC } from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

type FailLottieProps = {
    style?: Record<string, string>;
};

const FailLottie: FC<FailLottieProps> = ({
    style = { height: "6.5em" },
}): JSX.Element => {
    return (
        <DotLottiePlayer
            loop
            autoplay
            src="/lotties/fail.lottie"
            background="transparent"
            className="w-full cursor-pointer"
            style={{ objectFit: "cover", width: "100%", ...style }}
        />
    );
};

export default FailLottie;
