"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FC, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useScrollDefaultOptions } from "@/helpers/constants";
import { AnimatedTextProps } from "./types";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText);

const TextBlur: FC<AnimatedTextProps> = ({
  text,
  useScrollTrigger = true,
  className,
  ...props
}) => {
  const textRef = useRef<HTMLDivElement | null>(null);
  const scrolOpts = useScrollDefaultOptions();

  useGSAP(() => {
    if (!textRef.current) return;

    gsap.set(textRef.current, {
      opacity: 0,
    });

    const splitter = SplitText.create(textRef.current);

    gsap.set(splitter.chars, {
      opacity: 0,
      filter: "blur(15px)",
      scale: 3,
    });

    gsap.set(textRef.current, {
      opacity: 1,
    });

    gsap.to(splitter.chars, {
      opacity: 1,
      duration: 1.1,
      filter: "blur(0px)",
      stagger: 0.02,
      scale: 1,
      ease: "power4.out",
      ...(useScrollTrigger && {
        scrollTrigger: {
          ...scrolOpts,
          trigger: textRef.current,
        },
      }),
    });

    return () => {
      splitter.revert();
    };
  }, [text]);

  return (
    <div
      ref={textRef}
      className={cn("origin-top opacity-0", className)}
      {...props}
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};

export default TextBlur;
