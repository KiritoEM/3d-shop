"use client"

import { Button } from "@/components/ui/button";
import useButtonHover from "@/hooks/useButtonHover";
import { ArrowRight } from "lucide-react";
import React, { useRef, useState } from "react";

const Explore = (): JSX.Element => {
    const { buttonRef, circleSize, isHovered, startPosition, handleMouseEnter, handleMouseLeave } = useButtonHover();

    return (
        <section className="explore mt-[400px] mb-[140px] relative">
            <div className="explore__gradient blue-linear absolute w-fit left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>

            <div className="explore-content relative z-20 w-fit mx-auto text-center flex flex-col items-center">
                <h2 className="steps__title font-michroma text-[4em]">Explorez sans limites</h2>
                <p className="text-foreground/80 w-full max-w-[800px] mt-3 text-center">Votre curiosité n'a plus de barrières. Naviguez librement dans notre univers interactif et laissez vos sens guider vos choix.</p>

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