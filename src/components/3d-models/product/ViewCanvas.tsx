"use client";

import { Environment, useProgress, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { FC, Suspense, useState } from "react";
import Lights from "./Lights";
import { ProductModel } from "./model";
import { Config3D } from "@/models/product.model";

const Loader: FC = () => {
    const { progress } = useProgress();
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10 text-white">
            <div className="flex flex-col items-center space-y-2">
                <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-current"></div>
                <p className="text-base opacity-70 font-michroma mt-2">{progress.toFixed(0)} %</p>
            </div>
        </div>
    );
}

type ProductViewCanvasProps = {
    modelPath: string;
    config3D: Config3D
};

const ProductViewCanvas: FC<ProductViewCanvasProps> = ({ modelPath, config3D }): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const handleModelLoad = (state: boolean) => {
        setIsLoaded(state);
    };

    return (
        <div className="relative w-full h-full">
            {!isLoaded && <Loader />}

            <Canvas
                shadows
                dpr={[1, 1.5]}
                style={{
                    backgroundColor: "transparent",
                    width: "100%",
                    height: "100%",
                    opacity: isLoaded ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out"
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
                <Lights />
                <Stage
                    intensity={0.6}
                    preset="rembrandt"
                >
                    <Suspense fallback={null}>
                        <ProductModel
                            position={config3D.position}
                            rotation={config3D.rotation}
                            scale={config3D.scale}
                            modelPath={modelPath}
                            onLoad={handleModelLoad}
                        />
                    </Suspense>
                </Stage>
            </Canvas>
        </div>
    );
};

export default ProductViewCanvas;