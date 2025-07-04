"use client";

import { Button } from "@/components/ui/button";
import { Facial } from "@/icons";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const FacialDialogWrapper = dynamic(
    () => import("@/features/facial/components/DialogWrapper"),
    {
        ssr: false,
    },
);

const FacialTrigger = (): JSX.Element => {
    const { theme } = useTheme();
    return (
        <FacialDialogWrapper>
            <Button variant="outline" className="h-10 w-full space-x-5">
                <Facial
                    color={theme === "dark" ? "#ffffff" : "#0D0D0D"}
                    className="mr-1 hidden !size-5 sm:block"
                />{" "}
                Par reconnaissance faciale
            </Button>
        </FacialDialogWrapper>
    );
};

export default FacialTrigger;
