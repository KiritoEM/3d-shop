"use client";

import { Button } from "@/components/ui/button";
import { Facial } from "@/icons";
import dynamic from "next/dynamic";

const FacialDialogWrapper = dynamic(
    () => import("@/features/facial/components/DialogWrapper"),
    {
        ssr: false,
    },
);

const FacialTrigger = (): JSX.Element => {
    return (
        <FacialDialogWrapper>
            <Button variant="outline" className="h-10 w-full space-x-5">
                <Facial className="mr-1 hidden !size-5 sm:block" /> Par
                reconnaissance faciale
            </Button>
        </FacialDialogWrapper>
    );
};

export default FacialTrigger;
