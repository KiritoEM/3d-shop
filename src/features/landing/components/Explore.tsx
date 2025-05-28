"use client"

import TextFollow from "@/components/animations/TextFollow";
import { Button } from "@/components/ui/button";
import useButtonHover from "@/hooks/useButtonHover";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Explore = (): JSX.Element => {
    const { buttonRef, circleSize, isHovered, startPosition, handleMouseEnter, handleMouseLeave } = useButtonHover();
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const gradientRef = useRef<HTMLDivElement | null>(null);

    useGSAP(() => {
        if (!sectionRef.current || !gradientRef.current) return;
        const gradient = gradientRef.current;

        gsap.set(gradient, {
            opacity: 0,
            scale: 0.5
        })

        gsap.to(gradient, {
            opacity: 1,
            scale: 1,
            duration: .4,
            delay: 0.55,
            ease: "power3.out",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                end: "bottom 5%",
                toggleActions: "play reverse play reverse"
            }
        })
    }, { scope: sectionRef })

    return (
        <section className="explore mt-28 px-5 md:mt-[380px] mb-[140px] relative z-30" ref={sectionRef}>
            <div className="explore__gradient blue-linear absolute w-fit left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" ref={gradientRef}></div>

            <div className="explore-content relative z-20 w-fit mx-auto text-center flex flex-col items-center">
                <TextFollow
                    byLine
                    duration={1.3}
                    stagger={0.1}
                    className="steps__title font-michroma text-[2.7em] md:text-[4em] leading-tight"
                    text="Explorez sans limites"
                />

                <TextFollow
                    byLine
                    duration={1.3}
                    stagger={0.1}
                    className="steps__description w-full max-w-[800px] mt-5 mdd:mt-3 text-center"
                    text="Votre curiosité n'a plus de barrières. Naviguez librement dans notre univers interactif et laissez vos sens guider vos choix."
                />

                <Button
                    size="lg"
                    ref={buttonRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="mt-8 px-7 rounded-full bg-foreground hover:bg-foreground text-background overflow-hidden relative"
                >
                    <span className="relative inline-flex gap-3 items-center z-10">
                        Explorer notre shop <ArrowRight />
                    </span>
                    <div
                        className="absolute rounded-full bg-primary transition-all duration-700 ease-linear pointer-events-none"
                        style={{
                            left: `${startPosition.x}px`,
                            top: `${startPosition.y}px`,
                            width: `${circleSize}px`,
                            height: `${circleSize}px`,
                            transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0})`,
                            transitionProperty: 'transform',
                        }}
                    />
                </Button>
            </div>
        </section>
    );
};

export default Explore;