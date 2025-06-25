"use client";

import { useProgress, Stage, OrbitControls, useGLTF, Progress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { FC, Suspense, useEffect, useState } from "react";
import Lights from "./Lights";
import * as THREE from "three";
import { Config3D } from "@/models/productModel";

const Loader: FC = () => {
    const { progress } = useProgress();
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent h-full w-full z-40 text-white">
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
    orbitControl?: boolean;
    selectedMaterials?: Record<string, string>
};

const ProductViewCanvas: FC<ProductViewCanvasProps> = ({ modelPath, config3D, orbitControl = false, selectedMaterials }): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { scene, materials } = useGLTF(modelPath);

    useEffect(() => {
        if (scene) {
            setTimeout(() => {
                setIsLoaded(true);
            }, 600)
        }
    }, [scene, materials]);

    // Change color dynamic
    useEffect(() => {
        if (!materials || !scene) return;

        if (selectedMaterials && Object.keys(selectedMaterials).length) {
            Object.entries(selectedMaterials).forEach(([key, value]) => {
                const material = materials[key];

                if (material && material instanceof THREE.MeshStandardMaterial) {
                    material.color.set(value);
                }
            })
        }
    }, [selectedMaterials, materials, scene]);

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

                {orbitControl && <OrbitControls enableZoom={false} />}

                <Stage
                    intensity={0.4}
                    preset="upfront"
                >
                    <Suspense fallback={null}>
                        {/* Model */}
                        <group
                            dispose={null}
                            position={config3D.position ?? [0, 0, 0]}
                            rotation={config3D.rotation ?? [0, 0, 0]}
                            scale={config3D.scale ?? 2.4}
                        >
                            <primitive object={scene} />
                        </group>
                    </Suspense>
                </Stage>
            </Canvas>
        </div>
    );
};

export default ProductViewCanvas;