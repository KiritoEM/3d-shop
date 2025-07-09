"use client";

import { NAV_DATA, NAV_DATA_AUTHENTICATED } from "@/constants/constants";
import usePlaySound from "@/hooks/usePlaySound";
import { Logo } from "@/icons";
import { DotLottiePlayer } from "@dotlottie/react-player";
import { MenuIcon, X } from "lucide-react";
import React, { FC, Fragment, JSX, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import NavResponsive from "./components/NavResponsive";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import "@dotlottie/react-player/dist/index.css";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthLoadingScreen from "@/components/AuthLoadingScreen";

const MATCHED_PATH: string[] = ["/"];

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

type DropdownMenuActionsProps = {
    actions: (key: string) => void;
};

const DropdownMenuAuthentificatedActions: FC<DropdownMenuActionsProps> = ({
    actions,
}) => {
    return (
        <DropdownMenuContent className="flex w-48 flex-col gap-2 p-3">
            {NAV_DATA_AUTHENTICATED.map((item, index) => (
                <DropdownMenuItem
                    key={index}
                    className="animated-label flex cursor-pointer items-center gap-3 text-base transition-opacity hover:opacity-70"
                    onClick={() => actions(item.key)}
                >
                    <item.icon /> <span>{item.label}</span>
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    );
};

const MainNav = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { theme } = useTheme();
    const path = usePathname();
    const router = useRouter();
    const { data, status } = useSession();

    if (status === "loading") {
        return <AuthLoadingScreen text="Chargement..." />;
    }

    console.log(data);

    const isAbsolute = MATCHED_PATH.includes(path);

    const handleSignOut = async () => {
        await signOut({
            redirect: true,
            callbackUrl: "/",
        });
    };

    const handleDropdownmenuActions = (key: string) => {
        switch (key) {
            case "logout":
                handleSignOut();
                break;

            case "settings":
                router.push("/settings");
                break;

            default:
                break;
        }
    };

    return (
        <Fragment>
            <nav
                className={cn(
                    "main-nav top-0 z-50 w-full",
                    isAbsolute ? "absolute" : "fixed backdrop-blur-sm",
                )}
            >
                <div className="main-nav__container sm2:py-2 container flex items-center justify-between py-5 lg:py-3">
                    <Logo
                        color={theme === "light" ? "#0D0D0D" : "#ffffff"}
                        className="main-nav__logo lg:w-38 w-32 cursor-pointer sm:w-40"
                        onClick={() => router.push("/")}
                    />

                    <div className="actions flex items-center space-x-3 md:space-x-8 lg:space-x-10">
                        <ul className="menu-items hidden space-x-8 lg:flex">
                            {NAV_DATA.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.url ?? "/"}
                                        className={cn(
                                            "menu-items__label",
                                            path === item.url && "text-primary",
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="actions__container ml-3 flex items-center space-x-3 md:space-x-4 lg:space-x-6 xl:ml-5">
                            <SoundLottie />

                            {status === "authenticated" && data.user ? (
                                <Fragment>
                                    {/* For desktop */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="hidden lg:block">
                                            <Avatar
                                                image={data.user.image ?? ""}
                                                name={data.user.name!}
                                                className="!size-[2.1em]"
                                            />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuAuthentificatedActions
                                            actions={handleDropdownmenuActions}
                                        />
                                    </DropdownMenu>

                                    {/* For mobile  */}
                                    <div className="avatar block lg:hidden">
                                        <Avatar
                                            className="!size-7 lg:!size-7"
                                            image={data.user.image ?? ""}
                                            name={data.user.name!}
                                            onClick={() => setIsOpen(!isOpen)}
                                        />
                                    </div>
                                </Fragment>
                            ) : (
                                <div
                                    className="menu-icon bg-primary block cursor-pointer rounded-xl p-2 px-4 md:p-3 md:px-5 lg:hidden"
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    {!isOpen ? (
                                        <MenuIcon className="size-5 sm:size-6 md:size-7" />
                                    ) : (
                                        <X className="size-5 sm:size-6 md:size-7" />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <NavResponsive
                isOpen={isOpen}
                sessionStatus={status}
                actions={handleDropdownmenuActions}
            />
        </Fragment>
    );
};

export default MainNav;
