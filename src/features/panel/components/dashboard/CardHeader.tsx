"use client";

import React, { FC, ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";

type CardHeaderProps = {
    title: string;
    rightSide: ReactNode;
} & React.ComponentProps<"h5">;

const CardHeader: FC<CardHeaderProps> = ({
    title,
    rightSide,
    className,
    ...props
}): JSX.Element => {
    const isMobile = useMediaQuery({
        query: "(max-width: 640px)",
    });
    return (
        <header className="flex items-center justify-start gap-8 sm:justify-between">
            <h5
                className={cn("font-michroma text-lg xl:text-xl", className)}
                {...props}
            >
                {title}
            </h5>

            {!isMobile && rightSide}
        </header>
    );
};

export default CardHeader;
