"use client";

import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap";

const calculateResponsiveY = () => {
    const aboutSection = document.querySelector(".about") as HTMLDivElement;
    if (!aboutSection) return 240;

    const aboutHeight = aboutSection.offsetHeight;
    const additionalMargin = 358;

    return aboutHeight + additionalMargin;
};

const useIphoneScene = () => {
    const iphoneRef = useRef<THREE.Group | null>(null);
    const yRef = useRef<number>(0);
    const isLg = useMediaQuery({ query: "(max-width: 1279px)" });
    const isMd = useMediaQuery({ query: "(max-width: 1023px)" });

    useGSAP(() => {
        if (!iphoneRef.current) return;

        gsap.set(iphoneRef.current.position, {
            x: isLg ? -2.25 : isMd ? -0.8 : -3.4,
            y: 0,
        });

        const scrollTl = gsap.timeline({
            defaults: {
                duration: 2,
                ease: "power2.inOut",
            },
            scrollTrigger: {
                trigger: ".section-3d",
                start: "top center",
                end: "bottom-=80 center",
                scrub: 1,
            },
        });

        yRef.current = calculateResponsiveY();

        scrollTl
            .to(".iphone-model-container", {
                y: yRef.current,
            })
            .to(
                iphoneRef.current.rotation,
                {
                    y: Math.PI * 2,
                },
                "<+=0.1",
            )
            .to(
                iphoneRef.current.scale,
                {
                    x: isLg ? 3 : 3.9,
                    y: isLg ? 3 : 3.9,
                    z: isLg ? 3 : 3.9,
                },
                0.2,
            )
            .to(
                iphoneRef.current.position,
                {
                    x: 0,
                },
                "<+=0.02",
            );

        const handleResize = () => {
            const newY = calculateResponsiveY();
            scrollTl.to(".iphone-model-container", { y: newY }, 0);
            ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            scrollTl.kill();
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return { ref: iphoneRef };
};

export default useIphoneScene;
