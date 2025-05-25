"use client";

import { NAV_DATA } from "@/helpers/constants";
import Logo from "@/icons";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import React, { JSX, useRef, useState } from "react";

type SoundStateType = "play" | "pause";

const SoundLottie = () => {
  const [soundState, setSoundState] = useState<SoundStateType>("play");
  const playerRef = useRef<any>(null);

  const handleChangeSound = () => {
    if (soundState === "play") {
      playerRef.current.pause();
      playerRef.current?.seek(0); //Reset animation when pausing
      setSoundState("pause");
    } else {
      playerRef.current.play();
      setSoundState("play");
    }
  };
  return (
    <div className="actions__sound-lottie" onClick={handleChangeSound}>
      <DotLottiePlayer
        ref={playerRef}
        autoplay
        loop
        src="/lotties/sound.lottie"
        background="transparent"
        className="cursor-pointer"
        style={{ width: "100%", height: "4.82em", objectFit: "cover" }}
      ></DotLottiePlayer>
    </div>
  );
};

const MainNav = (): JSX.Element => {
  return (
    <nav className="main-nav absolute z-50 w-full">
      <div className="main-nav__container container flex items-center justify-between py-6">
        <Logo className="main-nav__logo w-38" />

        <div className="actions flex space-x-10 items-center">
          <ul className="menu-items flex space-x-8">
            {NAV_DATA.map((item, index) => (
              <li key={index} className="menu-items__label">
                {item.label}
              </li>
            ))}
          </ul>

          <SoundLottie />
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
