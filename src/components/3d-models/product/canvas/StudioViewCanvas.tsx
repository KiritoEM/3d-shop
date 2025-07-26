"use client";

import React, {
    FC,
    Fragment,
    Suspense,
    useEffect,
    useRef,
    useState,
} from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Center, Resize } from "@react-three/drei";
import Loader from "../Loader";
import { IGLTFModel } from "@/types";

const Studio = (): JSX.Element => {
    return (
        <Fragment>
            <color attach="background" args={["#1c1c1c"]} />
            <fog attach="fog" args={["#1c1c1c", 10, 20]} />
            <OrbitControls
                minDistance={3}
                maxDistance={5}
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
    model: IGLTFModel;
};

const StudioViewCanvas: FC<ProductViewCanvasProps> = ({
    model,
}): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scene } = model;

    useEffect(() => {
        if (scene) {
            // const box = new THREE.Box3().setFromObject(scene);
            // const center = new THREE.Vector3();
            // const size = new THREE.Vector3();

            // box.getCenter(center);
            // scene.position.sub(center);

            // box.getSize(size);
            // const maxAxis = Math.max(size.x, size.y, size.z);
            // const targetSize = 2.0;
            // const targetScale = targetSize / maxAxis;

            // scene.scale.multiplyScalar(targetScale);

            setTimeout(() => {
                setIsLoaded(true);
            }, 900);
        }
    }, [scene]);

    return (
        <div className="relative h-full w-full">
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
                <Studio />
                <Suspense fallback={null}>
                    <Center>
                        <Resize scale={0.7}>
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
