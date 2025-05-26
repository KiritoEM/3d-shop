"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "@/icons";
import { ArrowRight } from "lucide-react";
import { JSX, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import TextBlur from "@/components/animations/TextBlur";
import { useScrollDefaultOptions } from "@/helpers/constants";

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
      }
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
    <div className="hero__illustrations">
      <img
        src="/landing/megaphone.svg"
        className="animated-element absolute z-20 -top-[110px] -left-[142px] w-[365px]"
        alt="megaphones"
        ref={megaphoneRef}
      />

      <img
        src="/landing/headphones.svg"
        className="animated-element absolute z-20 -top-[100px] -right-[110px] w-[280px]"
        alt="headphone"
        ref={headphoneRef}
      />
    </div>
  );
};

const Hero = (): JSX.Element => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollOpt = useScrollDefaultOptions();

  useGSAP(() => {
    if (!sectionRef.current) return;

    const btn = sectionRef.current.querySelector("button");
    const tag = sectionRef.current.querySelector(".tag");

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
    <section id="hero" className="flex items-center justify-center w-full">
      <div className="hero__gradient absolute z-10 -top-[9vh] -left-3">
        <img src="/landing/hero-bg.png" className="w-screen" />
      </div>

      <div
        ref={sectionRef}
        className="hero__content relative text-center z-20 mt-[28.5vh] 2xl:mt-[30.5vh] flex flex-col items-center space-y-6"
      >
        <HeroIllustrations />

        <div className="tag animated-element w-fit rounded-full border px-5 py-2 flex items-center space-x-3 text-[13px]">
          <span className="text-[#CAC4C4]">Besoin de recommandation?</span>
          <span className="flex gap-1 items-center text-primary">
            Explorer <ArrowRight className="size-4" />
          </span>
        </div>

        <TextBlur
          className="font-michroma text-[5.2em] leading-none"
          text={`Découvrez <br /> un shopping en 3D`}
        />

        <Button size="lg" className="animated-element rounded-full mt-6">
          Voir nos produits
        </Button>
      </div>

      <div className="scroll-indicator w-14 h-14 absolute flex items-center justify-center bottom-8 right-8 border border-foreground rounded-full p-4">
        <ArrowDown className="size-8 animate-bounce relative -top-2" />
      </div>
    </section>
  );
};

export default Hero;
