"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { FC } from "react";

type SmoothScrollingProps = {
    children: any;
};

const SmoothScrolling: FC<SmoothScrollingProps> = ({ children }) => {
    return (
        <ReactLenis
            root
            options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
        >
            {children}
        </ReactLenis>
    );
};

export default SmoothScrolling;
