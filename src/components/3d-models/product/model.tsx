"use client";

import React, { forwardRef, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import useShopStore from "@/hooks/shop/shopStore";

interface ModelProps {
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number] | number;
    visible?: boolean;
    modelPath: string;
    onLoad: (state: boolean) => void;
}

export const ProductModel = forwardRef<THREE.Group, ModelProps>(
    (
        { position = [0, 0, 0], rotation = [0, 0, 0], scale = 2.4, visible = true, modelPath, onLoad },
        ref
    ) => {
        const internalRef = useRef<THREE.Group | null>(null);
        const { scene } = useGLTF(modelPath);
        const { rotateModel } = useShopStore();

        useEffect(() => {
            if (scene) {
                onLoad(true);
            }
        }, [scene, onLoad]);

        const groupRef = (ref as React.RefObject<THREE.Group | null>) || internalRef;

        // useFrame((state, delta) => {
        //     if (rotateModel && groupRef.current) {
        //         groupRef.current.rotation.y += 0.05 * delta * 60;
        //     }
        // });

        return (
            <group
                ref={groupRef}
                dispose={null}
                position={position}
                rotation={rotation}
                scale={scale}
                visible={visible}
            >
                <primitive object={scene} />
            </group>
        );
    }
);

ProductModel.displayName = "ProductModel";