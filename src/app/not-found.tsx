"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import "@dotlottie/react-player/dist/index.css";
import { DotLottiePlayer } from "@dotlottie/react-player";

const NotFound = (): JSX.Element => {
    return (
        <section className="flex min-h-screen w-full flex-col items-center justify-center space-y-6 px-5 text-center">
            <DotLottiePlayer
                loop
                autoplay
                src="/lotties/not-found.lottie"
                background="transparent"
                className="w-full cursor-pointer"
                style={{ width: "100%", height: "16em", objectFit: "cover" }}
            />
            <h1 className="font-michroma mt-1 text-3xl">
                Oops, contenu non disponible
            </h1>
            <Button className="rounded-full" asChild>
                <Link href="/shop">
                    <Home /> Revenir au shop
                </Link>
            </Button>
        </section>
    );
};

export default NotFound;
