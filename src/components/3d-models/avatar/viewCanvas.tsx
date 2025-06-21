"use client";

import { Canvas } from "@react-three/fiber";
import { AvatarModel } from "./model";
import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";

const AvatarViewCanvas = (): JSX.Element => {
    return (
        <Canvas
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
                position: [0, 0, 8]
            }}>
            <Environment preset="sunset" />

            <Suspense fallback={null}>
                {/* Model */}
                <AvatarModel scale={7.12} position={[0, -7.96, 0]} />
            </Suspense>

        </Canvas>
    );
};

export default AvatarViewCanvas;