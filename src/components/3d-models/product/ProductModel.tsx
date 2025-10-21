"use client";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Config3D } from "@/models/productModel";
import useShopStore from "@/features/shop/store/shopStore";

type Props = {
    modelPath: string;
    config3D: Config3D;
};

export default function ProductModel({ modelPath, config3D }: Props) {
    const { scene } = useGLTF(modelPath);
    const { setIsModelLoaded } = useShopStore();

    useEffect(() => {
        if (scene) {
            setTimeout(() => {
                setIsModelLoaded(true);
            }, 600);
        }
    }, [scene]);

    return (
        <group
            dispose={null}
            position={config3D.position ?? [0, 0, 0]}
            rotation={config3D.rotation ?? [0, 0, 0]}
        >
            <primitive object={scene} />
        </group>
    );
}
