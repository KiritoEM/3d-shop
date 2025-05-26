"use client";

import { useRef } from "react";
import { IphoneModel } from "./model";
import { useGSAP } from "@gsap/react";
import * as THREE from "three";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

const IphoneScene = (): JSX.Element => {
  const iphoneRef = useRef<THREE.Group | null>(null);

  useFrame((state) => {
    if (iphoneRef.current) {
      iphoneRef.current.rotation.y += 0.009;
    }
  });

  useGSAP(() => {
    if (!iphoneRef.current) return;

    gsap.set(iphoneRef.current.position, {
      x: -2.5,
    });
  }, []);
  return (
    <IphoneModel
      scale={3.2}
      ref={iphoneRef}
      position={[0, 0, 0]}
      rotation={[0.05, Math.PI, 0]}
    />
  );
};

export default IphoneScene;
