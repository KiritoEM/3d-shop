"use client";

import { NAV_DATA } from "@/constants/constants";
import usePlaySound from "@/hooks/usePlaySound";
import { Logo } from "@/icons";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { MenuIcon, X } from "lucide-react";
import React, { Fragment, JSX, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavResponsive from "./components/NavResponsive";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SoundLottie = () => {
  const togglePlaySound = usePlaySound((state) => state.togglePlaySound);
  const isPlaying = usePlaySound((state) => state.isPlaying);
  const playerRef = useRef<any>(null);

  const isMobile = useMediaQuery({ query: "(max-width: 400px)" });

  useEffect(() => {
    if (playerRef.current && !isPlaying) {
      playerRef.current.pause();
    }
  }, [])

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
    <div className="actions__sound-lottie" onClick={handleChangeSound} title="Play/pause music">
      <DotLottiePlayer
        ref={playerRef}
        loop
        src="/lotties/sound.lottie"
        background="transparent"
        className="cursor-pointer w-full"
        style={{ width: "100%", height: `${isMobile ? "2.64em" : "4.82em"}`, objectFit: "cover" }}
      />
    </div>
  );
};

const MainNav = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { theme } = useTheme();
  const path = usePathname();
  const router = useRouter();
  return (
    <Fragment>
      <nav className="main-nav absolute z-50 w-full">
        <div className="main-nav__container container flex items-center justify-between py-5 sm2:py-2 lg:py-6">
          <Logo color={theme === "light" ? "#0D0D0D" : "#ffffff"} className="main-nav__logo w-36 sm:w-42 lg:w-38 cursor-pointer" onClick={() => router.push("/")} />

          <div className="actions flex space-x-3 md:space-x-8 lg:space-x-10 items-center">
            <ul className="menu-items hidden lg:flex space-x-8">
              {NAV_DATA.map((item, index) => (
                <li key={index}>
                  <Link href={item.url ?? "/"} className={
                    cn("menu-items__label", path === item.url && "text-primary")
                  }>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <SoundLottie />

            {/* Menu icon */}
            <div className="menu-icon block lg:hidden p-2 md:p-3 px-4 md:px-5 rounded-xl bg-primary cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
              {
                !isOpen ? <MenuIcon className="size-5 sm:size-6 md:size-7" /> : <X className="size-5 sm:size-6 md:size-7" />
              }
            </div>
          </div>
        </div>
      </nav>

      <NavResponsive isOpen={isOpen} />
    </Fragment>
  );
};

export default MainNav;
