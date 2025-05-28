"use client";
import { useRef } from "react";
import { IphoneModel } from "./model";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Float } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

const IphoneScene = (): JSX.Element => {
  const iphoneRef = useRef<THREE.Group | null>(null);
  const yRef = useRef<number>(0);

  useGSAP(() => {
    if (!iphoneRef.current) return;

    gsap.set(iphoneRef.current.position, {
      x: -3.4,
      y: 0,
    });

    const calculateResponsiveY = () => {
      const aboutSection = document.querySelector(".about") as HTMLDivElement;
      if (!aboutSection) return 240;

      const aboutHeight = aboutSection.offsetHeight;
      const additionalMargin = 358;

      return aboutHeight + additionalMargin;
    };

    const scrollTl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: "power2.inOut",
      },
      scrollTrigger: {
        trigger: ".section-3d",
        start: "top center",
        end: "bottom-=80 center",
        scrub: 1,
      },
    });

    yRef.current = calculateResponsiveY();

    scrollTl
      .to(".iphone-model-container", {
        y: yRef.current,
      })
      .to(
        iphoneRef.current.rotation,
        {
          y: Math.PI * 2,
        },
        "<+=0.1"
      )
      .to(
        iphoneRef.current.scale,
        {
          x: 3.9,
          y: 3.9,
          z: 3.9,
        },
        0.2
      )
      .to(
        iphoneRef.current.position,
        {
          x: 0,
        },
        "<+=0.02"
      );

    const handleResize = () => {
      const newY = calculateResponsiveY();
      scrollTl.to(".iphone-model-container", { y: newY }, 0);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      scrollTl.kill();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.7}
      floatIntensity={0.7}
      floatingRange={[-0.06, 0.06]}
    >
      <IphoneModel
        scale={3.3}
        ref={iphoneRef}
        position={[0, 0, 0]}
        rotation={[0.05, Math.PI, 0]}
      />
    </Float>
  );
};

export default IphoneScene;
