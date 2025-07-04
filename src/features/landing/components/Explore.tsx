"use client";

import TextFollow from "@/components/animations/TextFollow";
import { Button } from "@/components/ui/button";
import useButtonHover from "@/hooks/useButtonHover";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Explore = (): JSX.Element => {
    const {
        buttonRef,
        circleSize,
        isHovered,
        startPosition,
        handleMouseEnter,
        handleMouseLeave,
        isTextChanged,
    } = useButtonHover();
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const gradientRef = useRef<HTMLDivElement | null>(null);

    useGSAP(
        () => {
            if (!sectionRef.current || !gradientRef.current) return;
            const gradient = gradientRef.current;

            gsap.set(gradient, {
                opacity: 0,
                scale: 0.5,
            });

            gsap.to(gradient, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                delay: 0.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    end: "bottom 5%",
                    toggleActions: "play reverse play reverse",
                },
            });
        },
        { scope: sectionRef },
    );

    return (
        <section
            className="explore relative z-30 mb-[140px] mt-28 px-5 lg:mt-[380px]"
            ref={sectionRef}
        >
            <div
                className="explore__gradient blue-linear absolute left-0 top-6 z-20 w-fit lg:-top-64"
                ref={gradientRef}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 967 1515"
                >
                    <g filter="url(#filter0_f_1_1228)">
                        <path
                            fill="#186be7"
                            d="M529.518 779.033c-83.862-90.255 34.942-211.014 104.827-260.111 229.486-122.221 365.479 385.466 325.814 441.876-39.664 56.412-229.486 84.612-189.822 0 39.664-84.615-135.992-68.945-240.819-181.765"
                        ></path>
                    </g>
                    <defs>
                        <filter
                            id="filter0_f_1_1228"
                            width="1466.33"
                            height="1514.2"
                            x="0.674"
                            y="0"
                            colorInterpolationFilters="sRGB"
                            filterUnits="userSpaceOnUse"
                        >
                            <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                            ></feFlood>
                            <feBlend
                                in="SourceGraphic"
                                in2="BackgroundImageFix"
                                result="shape"
                            ></feBlend>
                            <feGaussianBlur
                                result="effect1_foregroundBlur_1_1228"
                                stdDeviation="250"
                            ></feGaussianBlur>
                        </filter>
                    </defs>
                </svg>
            </div>

            <div className="explore-content relative z-20 mx-auto flex w-fit flex-col items-center text-center">
                <TextFollow
                    byLine
                    duration={1.3}
                    stagger={0.1}
                    className="steps__title font-michroma text-[2.7em] leading-tight md:text-[4em]"
                    text="Explorez sans limites"
                />

                <TextFollow
                    byLine
                    duration={1.3}
                    stagger={0.1}
                    className="steps__description mdd:mt-3 mt-5 w-full max-w-[800px] text-center"
                    text="Votre curiosité n'a plus de barrières. Naviguez librement dans notre univers interactif et laissez vos sens guider vos choix."
                />

                <Button
                    size="lg"
                    ref={buttonRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`mt-8 rounded-full px-7 ${isTextChanged ? "text-white" : "text-background"} bg-foreground hover:bg-foreground relative overflow-hidden`}
                    asChild
                >
                    <Link href="/shop">
                        <span className="relative z-10 inline-flex items-center gap-3">
                            Explorer notre shop <ArrowRight />
                        </span>
                        <div
                            className="bg-primary pointer-events-none absolute rounded-full transition-all duration-700 ease-linear"
                            style={{
                                left: `${startPosition.x}px`,
                                top: `${startPosition.y}px`,
                                width: `${circleSize}px`,
                                height: `${circleSize}px`,
                                transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
                                transitionProperty: "transform",
                            }}
                        />
                    </Link>
                </Button>
            </div>
        </section>
    );
};

export default Explore;
