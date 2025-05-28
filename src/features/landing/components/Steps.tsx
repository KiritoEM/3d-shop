"use client"

import TextLift from "@/components/animations/TextLift";
import { useGSAP } from "@gsap/react";
import { FC, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollDefaultOptions } from "@/helpers/constants";

gsap.registerPlugin(ScrollTrigger);

type StepCardProps = {
  title: string;
  index: number
};

const StepCard: FC<StepCardProps> = ({ title, index }): JSX.Element => {
  const cardRef = useRef<HTMLElement | null>(null);
  const scrollOpt = useScrollDefaultOptions();

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.set(card, {
      scale: 0,
      opacity: 0
    })

    gsap.to(card, {
      scale: 1,
      opacity: 1,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        ...scrollOpt,
        trigger: card,
      }
    })
  }, []);

  return (
    <article ref={cardRef} className="step-card p-5 dark-linear flex items-center w-full max-w-[440px] space-x-8 font-michroma backdrop-blur-sm">
      <h1 className="text-[3.8em]">{index + 1}.</h1>
      <h4 className="text-4xl">{title}</h4>
    </article>
  );
};

const Steps = (): JSX.Element => {
  return (
    <section className="steps mt-50 min-h-screen relative z-30">
      <TextLift className="steps__title font-michroma text-[4em] text-foreground mx-auto text-center leading-none" text="En 3 étapes <br />simples" />

      <div className="steps__cards mt-40">
        <div className="row-1 max-w-[1050px] mx-auto flex justify-between items-center">
          <StepCard index={0} title="Parcourez le catalogue" />

          <StepCard index={1} title="Examinez en 3D" />
        </div>

        <div className="row-2 flex justify-center mt-[180px]">
          <StepCard index={2} title="Achetez en un clic !" />
        </div>
      </div>
    </section>
  );
};

export default Steps;
