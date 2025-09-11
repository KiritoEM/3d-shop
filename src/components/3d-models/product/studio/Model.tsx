"use client";

import { FC } from "react";
import * as THREE from "three";
import { Center, Resize } from "@react-three/drei";
import { IGLTFModel } from "@/types";
import useStudioModel from "@/features/3d-studio/hooks/useStudioModel";

type StudioModelProps = {
    scene: IGLTFModel["scene"];
    ref: React.RefObject<THREE.Group> | null;
};

const StudioModel: FC<StudioModelProps> = ({ scene }): JSX.Element => {
    const {
        handlePointerOver,
        handlePointerOut,
        handlePointerMissed,
        handleClick,
    } = useStudioModel(scene);
    return (
        <Center>
            <Resize scale={0.46}>
                <primitive
                    object={scene}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    onPointerMissed={handlePointerMissed}
                    onClick={handleClick}
                />
            </Resize>
        </Center>
    );
};

export default StudioModel;
