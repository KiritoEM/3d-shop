import React, { ElementType, RefObject } from "react";

export interface AnimatedTextProps
    extends React.HTMLAttributes<HTMLDivElement> {
    text: string;
    useScrollTrigger?: boolean;
    scrollTriggerOpt?: {
        trigger: RefObject<HTMLElement>;
    };
}