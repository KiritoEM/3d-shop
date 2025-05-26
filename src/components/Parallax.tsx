"use client";

import { useWindowSize } from "@studio-freight/hamo";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FC, JSX, ReactNode, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type ParallaxProps = {
  className?: string;
  children: ReactNode;
  speed?: number;
  id?: string;
  range?: number;
};

const Parallax: FC<ParallaxProps> = ({
  id = "parallax",
  children,
  className = "",
  speed = 1,
  range = 100,
}): JSX.Element => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  // @ts-ignore
  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    if (!containerRef.current || !targetRef.current) return;

    const element = targetRef.current;
    const trigger = containerRef.current;

    gsap.set(element, { y: 0 });

    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const yOffset = (progress - 0.5) * range * speed;

        gsap.set(element, {
          y: yOffset,
        });
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [speed, range, windowWidth, id]);

  return (
    <div ref={containerRef} className={className}>
      <div ref={targetRef}>{children}</div>
    </div>
  );
};

export default Parallax;
