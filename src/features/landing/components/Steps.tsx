"use client";

import TextLift from "@/components/animations/TextLift";
import { useGSAP } from "@gsap/react";
import { FC, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollDefaultOptions } from "@/constants/constants";
import { perspective3D } from "@/lib/perpective";

gsap.registerPlugin(ScrollTrigger);

type StepCardProps = {
    title: string;
    index: number;
};

const StepCard: FC<StepCardProps> = ({ title, index }): JSX.Element => {
    const cardRef = useRef<HTMLElement | null>(null);
    const scrollOpt = useScrollDefaultOptions();
    const { handleMouseLeave, handleMouseMove } = perspective3D(cardRef);

    useEffect(() => {
        if (!cardRef.current) return;

        cardRef.current.addEventListener("mousemove", handleMouseMove);
        cardRef.current.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cardRef.current?.removeEventListener("mousemove", handleMouseMove);
            cardRef.current?.removeEventListener(
                "mouseleave",
                handleMouseLeave,
            );
        };
    }, [handleMouseLeave, handleMouseMove]);

    useGSAP(() => {
        const card = cardRef.current;
        if (!card) return;

        gsap.set(card, {
            scale: 0,
            opacity: 0,
        });

        gsap.to(card, {
            scale: 1,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                ...scrollOpt,
                trigger: card,
            },
        });
    }, []);

    return (
        <article
            ref={cardRef}
            className="step-card dark-linear font-michroma flex w-full max-w-[320px] items-center space-x-8 rounded-[14px] border border-[#6b6a6a] p-5 backdrop-blur-sm lg:max-w-[440px]"
        >
            <h1 className="text-[2.8em] md:text-[3em] lg:text-[3.8em]">
                {index + 1}.
            </h1>
            <h4 className="text-xl md:text-2xl lg:text-4xl">{title}</h4>
        </article>
    );
};

const Steps = (): JSX.Element => {
    return (
        <section className="steps mt-30 lg:mt-50 relative z-30 md:mt-36 md:min-h-screen">
            <TextLift
                className="steps__title font-michroma text-foreground mx-auto text-center text-[3em] leading-none md:text-[4em]"
                text="En <span class='text-primary'>3 étapes</span> <br />simples"
            />

            <div className="steps__cards mt-40 hidden px-6 md:block lg:px-0">
                <div className="row-1 mx-auto flex max-w-[1050px] items-center justify-between">
                    <StepCard index={0} title="Parcourez le catalogue" />

                    <StepCard index={1} title="Examinez en 3D" />
                </div>

                <div className="row-2 mt-[180px] flex justify-center">
                    <StepCard index={2} title="Achetez en un clic !" />
                </div>
            </div>

            {/* Steps cards responsive */}
            <div className="steps__cards mx-auto mt-16 flex w-fit flex-col gap-8 px-6 md:hidden lg:px-0">
                <StepCard index={0} title="Parcourez le catalogue" />
                <StepCard index={1} title="Examinez en 3D" />
                <StepCard index={2} title="Achetez en un clic !" />
            </div>
        </section>
    );
};

export default Steps;
