"use client";

import "@dotlottie/react-player/dist/index.css";
import { DotLottiePlayer } from "@dotlottie/react-player";

const Lottie = (): JSX.Element => {
    return (
        <DotLottiePlayer
            loop
            autoplay
            src="/lotties/success.lottie"
            background="transparent"
            className="w-full cursor-pointer"
            style={{ width: "100%", height: "8em", objectFit: "cover" }}
        />
    );
};

export default Lottie;
