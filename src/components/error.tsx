"use client";

import { Button } from "@/components/ui/button";
import { isDevelopment } from "@/lib/utils";
import { Home, RefreshCcw } from "lucide-react";
import { FC, useEffect } from "react";

const Error: FC<{ error: string }> = ({ error }): JSX.Element => {
    useEffect(() => {
        isDevelopment ? console.error("An error occurred:", error) : null; //log the error to the console
    }, [error]);
    return (
        <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
            <h1 className="font-michroma mb-4 text-3xl">
                Une erreur est survenue
            </h1>
            <p className="mb-2 text-lg">
                Désolé, quelque chose s'est mal passé.
            </p>
            <Button
                className="mt-3 rounded-full"
                onClick={() => window.location.reload()}
            >
                <RefreshCcw /> Actualiser
            </Button>
        </section>
    );
};

export default Error;
