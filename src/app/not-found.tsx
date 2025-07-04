"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LogInIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const NotFound = (): JSX.Element => {
    const pathname = usePathname();

    const redirectLink = () => {
        let linkJSX: JSX.Element = (
            <Link href="/shop">
                <Home /> Revenir au shop
            </Link>
        );
        if (pathname.startsWith("/admin")) {
            linkJSX = (
                <Link href="/admin/statistics">
                    <LogInIcon className="hidden sm:block" /> Retour au tableau
                    de bord
                </Link>
            );
        }

        return linkJSX;
    };
    return (
        <section className="flex min-h-screen w-full flex-col items-center justify-center space-y-6 overflow-hidden px-5 text-center">
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
                {redirectLink()}
            </Button>
        </section>
    );
};

export default NotFound;
