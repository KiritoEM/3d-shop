"use client";

import React, { FC, Suspense, useEffect } from "react";
import { Stage, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Config3D } from "@/models/productModel";
import Lights from "./Lights";
import Loader from "./Loader";
import useShopStore from "@/features/shop/store/shopStore";

type ProductViewCanvasProps = {
    modelPath: string;
    config3D: Config3D;
    orbitControl?: boolean;
};

const ProductViewCanvas: FC<ProductViewCanvasProps> = ({
    modelPath,
    config3D,
    orbitControl = false,
}): JSX.Element => {
    const { scene, materials } = useGLTF(modelPath);
    const { isModelLoaded, setIsModelLoaded } = useShopStore();

    useEffect(() => {
        if (scene) {
            setTimeout(() => {
                setIsModelLoaded(true);
            }, 600);
        }
    }, [scene, materials]);

    return (
        <div className="relative h-full w-full">
            {!isModelLoaded && <Loader />}

            <Canvas
                shadows
                dpr={[1, 1.5]}
                style={{
                    backgroundColor: "transparent",
                    width: "100%",
                    height: "100%",
                    opacity: isModelLoaded ? 1 : 0,
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

                <Stage intensity={0.006} preset="upfront" adjustCamera={1.1}>
                    <Suspense fallback={null}>
                        {/* Model */}
                        <group
                            dispose={null}
                            position={config3D.position ?? [0, 0, 0]}
                            rotation={config3D.rotation ?? [0, 0, 0]}
                            // scale={config3D.scale ?? 2.4}
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
