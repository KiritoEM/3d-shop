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

  useGSAP(() => {
    if (!iphoneRef.current) return;

    gsap.set(iphoneRef.current.position, {
      x: -3.4,
      y: 0,
    });

    const scrollTl = gsap.timeline({
      defaults: {
        duration: 2,
        ease: "power2.inOut",
      },
      scrollTrigger: {
        trigger: ".section-3d",
        start: "top 45%",
        end: "bottom center",
        scrub: true,
      },
    });

    scrollTl
      .to(".iphone-model-container", {
        y: "146vh",
        delay: 0.1,
      })
      .to(
        iphoneRef.current.rotation,
        {
          y: Math.PI * 2,
        },
        0.2
      )
      .to(
        iphoneRef.current.rotation,
        {
          z: 0,
          x: 0,
          y: 0,
        },
        0.2
      )
      .to(
        iphoneRef.current.scale,
        {
          x: 4,
          y: 4,
          z: 4,
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

    return () => {
      scrollTl.kill();
    };
  }, []);

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[-0.05, 0.05]}
    >
      <IphoneModel
        scale={3.56}
        ref={iphoneRef}
        position={[0, 0, 0]}
        rotation={[0.05, Math.PI, 0]}
      />
    </Float>
  );
};

export default IphoneScene;
