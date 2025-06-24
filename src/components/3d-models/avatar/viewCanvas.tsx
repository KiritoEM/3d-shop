"use client";

import { Canvas } from "@react-three/fiber";
import { AvatarModel } from "./model";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";

const AvatarViewCanvas = (): JSX.Element => {
    return (
        <Canvas
            style={{
                height: "100%",
                width: "100%",
            }}
            camera={{
                fov: 40,
                position: [0, 0, 10]
            }}
        >
            <Environment preset="sunset" />

            <Suspense fallback={null}>
                {/* Model */}
                <AvatarModel
                    scale={5.4}
                    position={[0, -6.55, 0]}
                />
            </Suspense>
        </Canvas>
    );
};

export default AvatarViewCanvas;