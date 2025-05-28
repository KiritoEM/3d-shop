"use client"

import { useRef, useState } from "react";

type Position = {
    x: number;
    y: number;
}

const useButtonHover = () => {
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [circleSize, setCircleSize] = useState<number>(0);

    const handleMouseEnter = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setStartPosition({ x, y });
        setIsHovered(true);

        //calculate circle size
        const width = rect.width;
        const height = rect.height;
        const diameter = Math.ceil(Math.sqrt(width ** 2 + height ** 2)) * 2;
        setCircleSize(diameter);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    }

    return {
        buttonRef,
        startPosition,
        isHovered,
        circleSize,
        handleMouseEnter,
        handleMouseLeave
    }
};

export default useButtonHover;