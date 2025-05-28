"use client";

import TextFadedScroll from "@/components/animations/TextFadedScroll";
import { useScrollDefaultOptions } from "@/helpers/constants";
import { ABOUT_DATA } from "@/helpers/data/landing-data";
import { AboutCardTypes } from "@/helpers/types";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { FC, JSX, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const ABOUT_TEXT: string[] = ["Découvrez une", "nouvelle façon de", "shopper"];

const AboutCard: FC<AboutCardTypes> = ({ icon, text, index }) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const isOdd = index! % 2 === 0;
  const scrollOpt = useScrollDefaultOptions();

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, {
      opacity: 0,
      x: isOdd ? 120 : -120,
    });

    gsap.to(card, {
      opacity: 1,
      duration: 0.7,
      ease: "bounce",
      x: 0,
      scrollTrigger: {
        ...scrollOpt,
        trigger: card,
        markers: false,
      },
    });
  }, [index, isOdd]);

  return (
    <article
      ref={cardRef}
      className={cn(
        "about-card p-5 yellow-linear flex items-center space-x-8",
        index! % 2 === 0 && "relative left-14"
      )}
    >
      <div className="about-card__icon w-[128px] h-[128px] bg-white rounded-xl flex items-center justify-center">
        <Image src={icon} height={58} width={58} alt={icon.split(".")[0]} />
      </div>

      <h4 className="about-card__title text-2xl flex-1">{text}</h4>
    </article>
  );
};

const About = (): JSX.Element => {
  return (
    <section className="about container px-0 pl-12 min-h-screen flex justify-end">
      <div className="content w-full max-w-[600px] relative z-20 right-[60px]">
        <div className="content__title font-michroma text-5xl text-foreground">
          {ABOUT_TEXT.map((phrase, index) => (
            <TextFadedScroll key={index}>{phrase}</TextFadedScroll>
          ))}
        </div>

        <div className="about-cards flex flex-col space-y-8 mt-16">
          {ABOUT_DATA.map((item, index) => (
            <AboutCard key={index} index={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
