"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FC, ReactNode, useRef } from "react";

const TextFadedScroll: FC<{ children: ReactNode }> = ({
  children,
}): JSX.Element => {
  const textRef = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    const text = textRef.current;

    gsap.set(text, {
      opacity: 0,
      x: 220,
    });

    gsap.to(text, {
      scrollTrigger: {
        trigger: text,
        scrub: 2,
        start: "top 60%",
        end: "bottom bottom",
      },
      opacity: 1,
      x: 0,
      ease: "power3.out",
    });
  });

  return <p ref={textRef}>{children}</p>;
};

export default TextFadedScroll;
