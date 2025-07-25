"use client";

import React, { FC, Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { Stage, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Config3D } from "@/models/productModel";
import Lights from "../Lights";
import Loader from "../Loader";

type ProductViewCanvasProps = {
    modelPath: string;
    config3D: Config3D;
    orbitControl?: boolean;
    selectedMaterials?: Record<string, string>;
};

const ProductViewCanvas: FC<ProductViewCanvasProps> = ({
    modelPath,
    config3D,
    orbitControl = false,
    selectedMaterials,
}): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { scene, materials } = useGLTF(modelPath);

    useEffect(() => {
        if (scene) {
            setTimeout(() => {
                setIsLoaded(true);
            }, 600);
        }
    }, [scene, materials]);

    // Change color dynamic
    useEffect(() => {
        if (!materials || !scene) return;

        if (selectedMaterials && Object.keys(selectedMaterials).length) {
            Object.entries(selectedMaterials).forEach(([key, value]) => {
                const material = materials[key];

                if (
                    material &&
                    material instanceof THREE.MeshStandardMaterial
                ) {
                    material.color.set(value);
                }
            });
        }
    }, [selectedMaterials, materials, scene]);

    return (
        <div className="relative h-full w-full">
            {!isLoaded && <Loader />}

            <Canvas
                shadows
                dpr={[1, 1.5]}
                style={{
                    backgroundColor: "transparent",
                    width: "100%",
                    height: "100%",
                    opacity: isLoaded ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
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

                <Stage intensity={0.4} preset="upfront">
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
