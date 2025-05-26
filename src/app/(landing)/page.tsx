"use client";

import Hero from "@/features/landing/components/Hero";
import { JSX, useEffect } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

const Landing = (): JSX.Element => {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      new LocomotiveScroll({
        // @ts-ignore
        lenisOptions: {
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        },
      });
    })();
  }, []);
  return (
    <section className="landing">
      <Hero />
      <div className="h-[200vh]"></div>
    </section>
  );
};

export default Landing;
