"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { JSX, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TextBlur from "@/components/animations/TextBlur";
import { useScrollDefaultOptions } from "@/constants/constants";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Parallax from "@/components/Parallax";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const HeroIllustrations = () => {
    const megaphoneRef = useRef<HTMLImageElement | null>(null);
    const headphoneRef = useRef<HTMLImageElement | null>(null);

    useGSAP(() => {
        //initial animations
        const tl = gsap.timeline();
        tl.fromTo(
            [megaphoneRef.current, headphoneRef.current],
            {
                opacity: 0,
                y: -40,
                scale: 0.8,
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                delay: 0.5,
                duration: 1.2,
                ease: "back.out(1.7)",
                stagger: 0.3,
            },
        );

        //animations
        gsap.to(megaphoneRef.current, {
            y: -5.5,
            rotation: 3,
            duration: 1.8,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0,
        });

        gsap.to(headphoneRef.current, {
            y: -4,
            rotation: -2,
            duration: 2.4,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            delay: 0.7,
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <Parallax
            speed={1.4}
            className="hero__illustrations relative z-30 hidden w-full md:block"
        >
            <img
                src="/landing/megaphone.svg"
                className="animated-element absolute -left-[100px] -top-[160px] w-[345px] lg:-left-[122px] lg:-top-[130px] xl:-left-[142px] xl:-top-[110px] xl:w-[365px] 2xl:w-[395px]"
                alt="megaphones"
                ref={megaphoneRef}
            />

            <img
                src="/landing/headphones.svg"
                className="animated-element absolute -right-[60px] -top-[150px] w-[260px] lg:-right-[90px] lg:-top-[116px] xl:-right-[110px] xl:-top-[100px] xl:w-[280px] 2xl:w-[310px]"
                alt="headphone"
                ref={headphoneRef}
            />
        </Parallax>
    );
};

const Hero = (): JSX.Element => {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const gradientRef = useRef<HTMLDivElement | null>(null);
    const scrollOpt = useScrollDefaultOptions();

    useGSAP(() => {
        if (!sectionRef.current) return;

        const btn = sectionRef.current.querySelector(".hero__cta");
        const tag = sectionRef.current.querySelector(".tag");

        gsap.set(gradientRef.current, {
            opacity: 0,
        });

        gsap.to(gradientRef.current, {
            opacity: 1,
            duration: 0.5,
            delay: 0.4,
            ease: "power2.out",
        });

        const tl = gsap.timeline({
            defaults: {
                ease: "power1.out",
            },
            scrollTrigger: {
                ...scrollOpt,
                trigger: sectionRef.current,
            },
        });

        tl.set(btn, {
            opacity: 0,
            y: 90,
        });

        tl.set(tag, {
            opacity: 0,
            y: -100,
        });

        tl.to(tag, {
            opacity: 1,
            y: 0,
            duration: 0.5,
        });

        tl.to(btn, {
            opacity: 1,
            y: 0,
            duration: 0.5,
        });
    }, []);

    return (
        <section className="hero flex min-h-screen w-full items-center justify-center">
            <div
                className="hero__gradient absolute -left-3 top-0 z-10 opacity-0 lg:-top-[9vh]"
                ref={gradientRef}
            >
                <img src="/landing/hero-bg.png" className="w-screen" />
            </div>

            <div
                ref={sectionRef}
                className="hero__content relative z-20 my-[28.5vh] flex flex-col items-center space-y-6 px-5 text-center md:px-0 2xl:my-[30.5vh]"
            >
                <HeroIllustrations />

                <div className="tag animated-element sm2:text-[13px] flex w-fit items-center space-x-2 rounded-lg border px-5 py-2 text-[12px] md:space-x-3 xl:text-[15px] 2xl:text-[16px]">
                    <span className="text-[#CAC4C4]">
                        Besoin de recommandation?
                    </span>
                    <Link
                        href="/"
                        className="text-primary flex items-center gap-1"
                    >
                        Explorer <ArrowRight className="size-4" />
                    </Link>
                </div>

                <TextBlur
                    className="font-michroma sm2:text-[2.37em] text-[2.17em] leading-tight sm:text-[2.9em] md:text-[3.8em] md:leading-none lg:text-[4.5em] xl:text-[5.2em] 2xl:text-[6.3em]"
                    text={`Découvrez <br /> un shopping en 3D`}
                />

                <Button
                    size="lg"
                    className="hero__cta animated-element mt-6 rounded-full"
                    asChild
                >
                    <Link href="/shop">Voir nos produits</Link>
                </Button>
            </div>
        </section>
    );
};

export default Hero;
