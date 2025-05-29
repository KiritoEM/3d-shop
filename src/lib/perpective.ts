import { RefObject } from "react";

const perspective3D = (elementRef: RefObject<HTMLElement | null>) => {
    const handleMouseMove = (e: MouseEvent) => {
        const element = elementRef.current;

        if (element) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            const rotateX = deltaY * 32;
            const rotateY = -deltaX * 32;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
            (element.style as any).hover = "true";
        }
    }

    const handleMouseLeave = () => {
        const element = elementRef.current;
        if (element) {
            element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
        }
    };

    return {
        handleMouseLeave,
        handleMouseMove
    }
}

export { perspective3D }