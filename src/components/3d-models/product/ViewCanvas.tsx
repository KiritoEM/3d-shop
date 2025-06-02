"use client";

import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { FC, Suspense } from "react";
import Lights from "./Lights";
import { ProductModel } from "./model";
import { Config3D } from "@/models/Product.model";

type ProductViewCanvasProps = {
    modelPath: string;
    config3d?: Partial<Config3D>
}

const ProductViewCanvas: FC<ProductViewCanvasProps> = ({ modelPath, config3d = { rotation: [0, 0, 0], position: [0, 0, 0], scale: 2.4 } }): JSX.Element => {
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
                        scale={config3d.scale}
                        position={config3d.position}
                        rotation={config3d.rotation}
                        modelPath={modelPath}
                    />
                </Suspense>
            </group>
        </Canvas>
    );
};

export default ProductViewCanvas;
