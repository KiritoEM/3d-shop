"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import "@dotlottie/react-player/dist/index.css";
import { DotLottiePlayer } from "@dotlottie/react-player";

const NotFound = (): JSX.Element => {
    return (
        <section className="flex flex-col space-y-6 items-center justify-center w-full min-h-screen text-center px-5">
            <DotLottiePlayer
                loop
                autoplay
                src="/lotties/not-found.lottie"
                background="transparent"
                className="cursor-pointer w-full"
                style={{ width: "100%", height: "16em", objectFit: "cover" }}
            />
            <h1 className="font-michroma text-3xl mt-1">Oops, contenu non disponible</h1>
            <Button className="rounded-full" asChild>
                <Link href="/shop">
                    <Home /> Revenir au shop
                </Link>
            </Button>
        </section>
    );
};

export default NotFound;