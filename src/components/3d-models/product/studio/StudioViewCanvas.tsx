import React, { FC, Suspense, useEffect, useRef, useState } from "react";
import { Environment, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Center, Resize } from "@react-three/drei";
import { IGLTFModel } from "@/types";
import Loader from "../Loader";
import Controller from "./Controller";

type ProductViewCanvasProps = {
    model: IGLTFModel;
};

const StudioViewCanvas: FC<ProductViewCanvasProps> = ({
    model,
}): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scene, materials } = useGLTF(
        "/uploaded-models/iphone_16_pro_max.glb",
    );

    console.log(materials);

    useEffect(() => {
        if (scene) {
            setTimeout(() => {
                setIsLoaded(true);
            }, 900);
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
                }}
                camera={{
                    fov: 25,
                    position: [-2, 0, 0],
                }}
            >
                <color attach="background" args={["#1c1c1c"]} />
                <fog attach="fog" args={["#1c1c1c", 10, 20]} />
                <Environment preset="warehouse" environmentIntensity={0.84} />

                <Controller />

                <Suspense fallback={null}>
                    <Center>
                        <Resize scale={0.46}>
                            <group
                                dispose={null}
                                position={[0, 0, 0]}
                                rotation={[0, 0, 0]}
                            >
                                <primitive object={scene} />
                            </group>
                        </Resize>
                    </Center>
                </Suspense>
            </Canvas>
        </div>
    );
};

export default StudioViewCanvas;
