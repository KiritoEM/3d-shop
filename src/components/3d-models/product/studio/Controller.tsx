"use client";

import { FC, useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import { CAMERA_ZOOM } from "@/constants/constants";
import { useStudio } from "@/features/3d-studio/store/studio";

type ControllerProps = {
    isHovered: boolean;
};

const Controller: FC<ControllerProps> = ({ isHovered }): JSX.Element => {
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
            minDistance={1.3}
            autoRotate={!isHovered}
            autoRotateSpeed={-0.6}
            zoomSpeed={CAMERA_ZOOM}
            enablePan={false}
        />
    );
};

export default Controller;
