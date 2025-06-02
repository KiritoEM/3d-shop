"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Lights from "./Lights";
import { ProductModel } from "./model";

const ProductViewCanvas = (): JSX.Element => {
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
                fov: 50,
                position: [0, 0, 5],
                near: 0.1,
                far: 1000,
            }}
        >
            <group>
                <Lights />
                <Environment preset="city" />

                <Suspense fallback={null}>
                    <ProductModel
                        position={[0, 0, 0]}
                        rotation={[-0.18, Math.PI - 0.6, 0.4]}
                    />
                </Suspense>
            </group>
        </Canvas>
    );
};

export default ProductViewCanvas;
