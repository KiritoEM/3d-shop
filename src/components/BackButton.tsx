"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = (): JSX.Element => {
    const router = useRouter();
    return (
        <div
            className="back-btn absolute left-10 top-10 flex h-fit w-fit cursor-pointer items-center gap-4 text-black"
            onClick={() => router.back()}
        >
            <ArrowLeft className="size-6 cursor-pointer" />
            <p>Retour</p>
        </div>
    );
};

export default BackButton;
