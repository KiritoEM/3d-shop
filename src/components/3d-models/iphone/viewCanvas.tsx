"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Lights from "./Lights";
import IphoneScene from "./scene";

const IphoneViewCanvas = (): JSX.Element => {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      style={{
        backgroundColor: "transparent",
        width: "100%",
        height: "100%",
      }}
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      }}
      camera={{
        fov: 75,
        position: [0, 0, 5],
        near: 0.1,
        far: 1000,
      }}
    >
      <group>
        <Lights />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <IphoneScene />
        </Suspense>
      </group>
    </Canvas>
  );
};

export default IphoneViewCanvas;
