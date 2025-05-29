"use client"

import { useLayoutEffect, useState } from "react";

const useViewportDimension = () => {
    const [viewportHeight, setViewportHeight] = useState<number>(0);

    useLayoutEffect(() => {
        setViewportHeight(window.scrollY);

        const handleScroll = () => {
            setViewportHeight(window.scrollY);
        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return {
        viewportHeight
    }
}

export default useViewportDimension;