"use client";

import { Canvas } from "@react-three/fiber";
import { AvatarModel } from "./model";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import CommonLoader from "../Loader";
import { useMediaQuery } from "react-responsive";

const AvatarViewCanvas = (): JSX.Element => {
    const isSm = useMediaQuery({ query: '(max-width: 639px)' });
    const isMd = useMediaQuery({ query: '(max-width: 767px)' });
    const isLg = useMediaQuery({ query: '(max-width: 1023px)' });
    const isXl = useMediaQuery({ query: '(max-width: 1279px)' });
    const is2xl = useMediaQuery({ query: '(max-width: 1535px)' });
    const is3xl = useMediaQuery({ query: '(min-width: 1536px)' });

    const getModelScale = () => {
        let modelScale: number = 4.7;

        if (isSm) {
            modelScale = 2.5;
        }
        else if (isMd) {
            modelScale = 3;
        }
        else if (isLg) {
            modelScale = 4;
        }
        else if (isXl) {
            modelScale = 4.4;
        }
        else if (is2xl) {
            modelScale = 4.65;
        }
        else if (is3xl) {
            modelScale = 4.7;
        }

        return modelScale;
    }

    return (
        <Canvas
            style={{
                height: "100%",
                width: "100%",
            }}
            camera={{
                fov: 40,
                position: [0, 0, 10]
            }}
        >
            <Environment preset="sunset" />

            <Suspense fallback={<CommonLoader />}>
                {/* Model */}
                <AvatarModel
                    scale={getModelScale()}
                    position={[0, -6, 0]}
                />
            </Suspense>
        </Canvas>
    );
};

export default AvatarViewCanvas;