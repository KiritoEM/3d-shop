"use client"

import React, { FC, useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { IAnimations, ModelProps } from "../types";

interface GLTFResult {
    nodes: {
        Wolf3D_Avatar: {
            geometry: THREE.BufferGeometry;
            skeleton: THREE.Skeleton;
            morphTargetDictionary: { [key: string]: number };
            morphTargetInfluences: number[];
        };
        Hips: THREE.Object3D;
        EyeLeft: {
            geometry: THREE.BufferGeometry;
            skeleton: THREE.Skeleton;
            morphTargetDictionary: { [key: string]: number };
            morphTargetInfluences: number[];
        };
        EyeRight: {
            geometry: THREE.BufferGeometry;
            skeleton: THREE.Skeleton;
            morphTargetDictionary: { [key: string]: number };
            morphTargetInfluences: number[];
        };
        Wolf3D_Head: {
            geometry: THREE.BufferGeometry;
            skeleton: THREE.Skeleton;
            morphTargetDictionary: { [key: string]: number };
            morphTargetInfluences: number[];
        };
        Wolf3D_Teeth: {
            geometry: THREE.BufferGeometry;
            skeleton: THREE.Skeleton;
            morphTargetDictionary: { [key: string]: number };
            morphTargetInfluences: number[];
        };
        Wolf3D_Hair: {
            geometry: THREE.BufferGeometry;
            skeleton: THREE.Skeleton;
        };
        Wolf3D_Glasses: {
            geometry: THREE.BufferGeometry;
            skeleton: THREE.Skeleton;
        };
        Wolf3D_Body: {
            geometry: THREE.BufferGeometry;
            skeleton: THREE.Skeleton;
        };
        Wolf3D_Outfit_Bottom: {
            geometry: THREE.BufferGeometry;
            skeleton: THREE.Skeleton;
        };
        Wolf3D_Outfit_Footwear: {
            geometry: THREE.BufferGeometry;
            skeleton: THREE.Skeleton;
        };
        Wolf3D_Outfit_Top: {
            geometry: THREE.BufferGeometry;
            skeleton: THREE.Skeleton;
        };
    };
    materials: {
        Wolf3D_Avatar: THREE.Material;
        Wolf3D_Eye: THREE.Material;
        Wolf3D_Skin: THREE.Material;
        Wolf3D_Teeth: THREE.Material;
        Wolf3D_Hair: THREE.Material;
        Wolf3D_Glasses: THREE.Material;
        Wolf3D_Body: THREE.Material;
        Wolf3D_Outfit_Bottom: THREE.Material;
        Wolf3D_Outfit_Footwear: THREE.Material;
        Wolf3D_Outfit_Top: THREE.Material;
    };
}

interface AvatarModelProps extends ModelProps {
    animation?: IAnimations;
}

export const AvatarModel: FC<AvatarModelProps> = ({ scale, position, rotation, visible, animation = "Talking" }) => {
    const { nodes, materials } = useGLTF("/3d-models/685672e31b6a13eb9809043e.glb") as unknown as GLTFResult;

    //Animations
    const { animations: idleAnimations } = useFBX("/3d-animations/Idle.fbx");
    const { animations: talkingAnimations } = useFBX("/3d-animations/Talking.fbx");

    const groupRef = useRef<THREE.Group>(null);

    const { actions } = useAnimations([idleAnimations[0], talkingAnimations[0]], groupRef);

    idleAnimations[0].name = "Idle";
    talkingAnimations[0].name = "Talking";

    useEffect(() => {
        //Stop all actions before playing the new one
        Object.values(actions).forEach(action => {
            if (action && action !== actions[animation]) {
                action.fadeOut(0.5);
            }
        });

        if (actions[animation]) {
            actions[animation].reset().fadeIn(0.5).play();
        }

        return () => {
            if (actions[animation]) {
                actions[animation].fadeOut(0.5);
            }
        };
    }, [animation, actions]);

    return (
        <group
            ref={groupRef}
            scale={scale}
            position={position}
            rotation={rotation}
            visible={visible}
            dispose={null}
        >
            <group rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <primitive object={nodes.Hips} />
            </group>

            <skinnedMesh
                name="EyeLeft"
                geometry={nodes.EyeLeft.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeLeft.skeleton}
                morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
            />
            <skinnedMesh
                name="EyeRight"
                geometry={nodes.EyeRight.geometry}
                material={materials.Wolf3D_Eye}
                skeleton={nodes.EyeRight.skeleton}
                morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
                morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
            />
            <skinnedMesh
                name="Wolf3D_Head"
                geometry={nodes.Wolf3D_Head.geometry}
                material={materials.Wolf3D_Skin}
                skeleton={nodes.Wolf3D_Head.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
            />
            <skinnedMesh
                name="Wolf3D_Teeth"
                geometry={nodes.Wolf3D_Teeth.geometry}
                material={materials.Wolf3D_Teeth}
                skeleton={nodes.Wolf3D_Teeth.skeleton}
                morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
                morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Hair.geometry}
                material={materials.Wolf3D_Hair}
                skeleton={nodes.Wolf3D_Hair.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Glasses.geometry}
                material={materials.Wolf3D_Glasses}
                skeleton={nodes.Wolf3D_Glasses.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Body.geometry}
                material={materials.Wolf3D_Body}
                skeleton={nodes.Wolf3D_Body.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
                material={materials.Wolf3D_Outfit_Bottom}
                skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
                material={materials.Wolf3D_Outfit_Footwear}
                skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
            />
            <skinnedMesh
                geometry={nodes.Wolf3D_Outfit_Top.geometry}
                material={materials.Wolf3D_Outfit_Top}
                skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            />
        </group>
    )
}

useGLTF.preload("/3d-models/685672e31b6a13eb9809043e.glb")