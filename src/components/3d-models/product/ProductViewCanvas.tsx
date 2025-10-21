"use client";

import React, { FC, Suspense } from "react";
import { Stage, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Config3D } from "@/models/productModel";
import Lights from "./Lights";
import useShopStore from "@/features/shop/store/shopStore";
import ProductModel from "./ProductModel";
import Loader from "./Loader";

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
    const { isModelLoaded } = useShopStore();

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
                        <ProductModel
                            modelPath={modelPath}
                            config3D={config3D}
                        />
                    </Suspense>
                </Stage>
            </Canvas>
        </div>
    );
};

export default ProductViewCanvas;
