import React, {
    FC,
    Fragment,
    Suspense,
    useEffect,
    useRef,
    useState,
} from "react";
import { useSpring, animated } from "@react-spring/three";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Resize } from "@react-three/drei";
import { IGLTFModel } from "@/types";
import { CAMERA_ZOOM } from "@/constants/constants";
import { useStudio } from "@/features/3d-studio/hooks/studio";
import Loader from "../Loader";

const Controller = (): JSX.Element => {
    const { cameraDistance, cameraUpdated, setCameraDistance } = useStudio();
    const controlsRef = useRef<any>(null);

    const { springDistance } = useSpring({
        springDistance: cameraDistance,
        config: { mass: 1, tension: 170, friction: 26 },
    });

    useEffect(() => {
        if (!controlsRef.current) return;
        setCameraDistance(controlsRef.current.getDistance());
    }, []);

    useFrame(() => {
        if (controlsRef.current && cameraUpdated) {
            const currentPosition = controlsRef.current.object.position;
            const currentDistance = currentPosition.length();
            const targetDistance = springDistance.get();

            if (Math.abs(currentDistance - targetDistance) > 0.01) {
                const factor = targetDistance / currentDistance;
                controlsRef.current.object.position.multiplyScalar(factor);
            }
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            maxDistance={2.4}
            minDistance={1.34}
            autoRotate
            autoRotateSpeed={-0.6}
            zoomSpeed={CAMERA_ZOOM}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 1.75}
            enablePan={false}
        />
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
    const { scene, materials } = useGLTF(
        "/uploaded-models/iphone_16_pro_max.glb",
    );

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
