"use client";

import React, { forwardRef, useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number] | number;
    visible?: boolean;
    modelPath: string;
    onLoad: (state: boolean) => void
}

export const ProductModel = forwardRef<THREE.Group, ModelProps>(
    (
        { position = [0, 0, 0], rotation = [0, 0, 0], scale = 2.4, visible = true, modelPath, onLoad },
        ref
    ) => {
        const internalRef = useRef<THREE.Group>(null);
        const { scene } = useGLTF(
            modelPath
        );

        useEffect(() => {
            if (scene) {
                onLoad(true);
            }
        }, [scene])

        const groupRef = ref || internalRef;

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
