"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";
import { FC, useEffect } from "react";

const Error: FC<{ error: string }> = ({ error }): JSX.Element => {
    useEffect(() => {
        console.error("An error occurred:", error); //log the error to the console
    }, [error]);
    return (
        <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
            <h1 className="font-michroma mb-4 text-3xl">
                Une erreur est survenue
            </h1>
            <p className="mb-2 text-lg">
                Désolé, quelque chose s'est mal passé.
            </p>
            <Button className="mt-3 rounded-full" asChild>
                <Link href="/shop">
                    <Home /> Revenir au shop
                </Link>
            </Button>
        </section>
    );
};

export default Error;
