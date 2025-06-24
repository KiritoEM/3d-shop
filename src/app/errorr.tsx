"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import { FC, useEffect } from "react";

const error: FC<{ error: Error & { digest?: string } }> = ({ error }): JSX.Element => {
    useEffect(() => {
        console.error("An error occurred:", error); //log the error to the console
    }, [error])
    return (
        <section className="flex flex-col items-center justify-center min-h-screen text-center px-5">
            <h1 className="text-3xl font-michroma mb-4">Une erreur est survenue</h1>
            <p className="text-lg mb-2">Désolé, quelque chose s'est mal passé.</p>
            <Button className="rounded-full mt-3" asChild>
                <Link href="/shop">
                    <Home /> Revenir au shop
                </Link>
            </Button>
        </section>
    );
};

export default error;