import React, { FC, Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { IGLTFModel } from "@/types";
import { useStudio } from "@/features/3d-studio/store/studio";
import Loader from "../Loader";
import Controller from "./Controller";
import Composer from "./Composer";
import StudioModel from "./Model";

interface ProductViewCanvasProps {
    model: IGLTFModel;
}

const StudioViewCanvas: FC<ProductViewCanvasProps> = ({
    model,
}): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const modelRef = useRef<THREE.Group>(null);
    const { hoveredMeshs, setCanvasRef } = useStudio();

    const { scene } = model;

    useEffect(() => {
        if (scene) {
            setTimeout(() => {
                setIsLoaded(true);
            }, 1400);
        }

        if (canvasRef.current) {
            setCanvasRef(canvasRef ?? null);
        }
    }, [scene]);

    return (
        <div className="relative z-20 h-full w-full">
            {!isLoaded && <Loader />}
            <Canvas
                ref={canvasRef}
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
                    autoClear: false,
                }}
                camera={{
                    fov: 25,
                    position: [-2, 0, 0],
                    near: 0.1,
                    far: 1000,
                }}
            >
                <color attach="background" args={["#1c1c1c"]} />
                <fog attach="fog" args={["#1c1c1c", 10, 20]} />
                <Environment preset="warehouse" environmentIntensity={0.84} />
                <Controller isHovered={hoveredMeshs.length !== 0} />

                <Suspense fallback={null}>
                    <StudioModel
                        ref={modelRef as React.RefObject<THREE.Group>}
                        scene={scene}
                    />
                </Suspense>

                <Composer />
            </Canvas>
        </div>
    );
};

export default StudioViewCanvas;
