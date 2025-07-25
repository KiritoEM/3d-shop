"use client";

import React, { FC, Fragment, Suspense, useEffect, useState } from "react";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Loader from "../Loader";

const Studio = (): JSX.Element => {
    return (
        <Fragment>
            <color attach="background" args={["#1c1c1c"]} />
            <fog attach="fog" args={["#1c1c1c", 10, 20]} />
            <OrbitControls
                minDistance={3}
                maxDistance={4.5}
                autoRotate
                autoRotateSpeed={-0.6}
                enablePan={false}
            />

            <directionalLight
                position={[-2, 1.4, 1.2]}
                castShadow
                intensity={0.3}
            />

            <Environment preset="warehouse" environmentIntensity={0.84} />
        </Fragment>
    );
};

type ProductViewCanvasProps = {
    model: any;
};

const StudioViewCanvas: FC<ProductViewCanvasProps> = ({
    model,
}): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const { scene, materials } = model;

    useEffect(() => {
        if (scene) {
            setIsLoaded(true);
        }
    }, [scene]);

    return (
        <div className="relative h-full w-full">
            {!isLoaded && <Loader />}

            <Canvas
                shadows
                style={{
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
                    fov: 25,
                    position: [-2, 0, 0],
                }}
            >
                <Studio />

                <Suspense fallback={null}>
                    {/* Model */}
                    <group
                        dispose={null}
                        position={[0, 0, 0]}
                        rotation={[0, 0, 0]}
                        scale={0.6}
                    >
                        <primitive object={scene} />
                    </group>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default StudioViewCanvas;
