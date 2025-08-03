"use client";

import React, { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { DotLottiePlayer } from "@dotlottie/react-player";
import { usePlaySound } from "@/store/sound";

const SoundLottie = () => {
    const togglePlaySound = usePlaySound((state) => state.togglePlaySound);
    const isPlaying = usePlaySound((state) => state.isPlaying);
    const playerRef = useRef<any>(null);

    const isMobile = useMediaQuery({ query: "(max-width: 400px)" });

    useEffect(() => {
        if (playerRef.current && !isPlaying) {
            playerRef.current.pause();
        }
    }, []);

    const handleChangeSound = () => {
        if (isPlaying) {
            playerRef.current.pause();
            togglePlaySound();
            playerRef.current?.seek(0); //Reset animation when pausing
        } else {
            togglePlaySound();
            playerRef.current.play();
        }
    };
    return (
        <div
            className="actions__sound-lottie"
            onClick={handleChangeSound}
            title="Play/pause music"
        >
            <DotLottiePlayer
                ref={playerRef}
                loop
                src="/lotties/sound.lottie"
                background="transparent"
                className="w-full cursor-pointer"
                style={{
                    width: "100%",
                    height: `${isMobile ? "2.64em" : "4.3em"}`,
                    objectFit: "cover",
                }}
            />
        </div>
    );
};

export default SoundLottie;
