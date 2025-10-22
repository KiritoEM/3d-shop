"use client";

import React, { FC, memo, useEffect, useRef } from "react";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { ModelProps } from "../types";
import { useSpeechAvatar } from "@/features/recommandations/store/avatar";
import { extractViseme } from "@/lib/viseme";
import { useFrame } from "@react-three/fiber";

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
        "Wolf3D_Eye.002"?: THREE.Material;
        Wolf3D_Skin: THREE.Material;
        "Wolf3D_Skin.002"?: THREE.Material;
        Wolf3D_Teeth: THREE.Material;
        "Wolf3D_Teeth.002"?: THREE.Material;
        Wolf3D_Hair: THREE.Material;
        "Wolf3D_Hair.002"?: THREE.Material;
        Wolf3D_Glasses: THREE.Material;
        "Wolf3D_Glasses.001"?: THREE.Material;
        Wolf3D_Body: THREE.Material;
        "Wolf3D_Body.002"?: THREE.Material;
        Wolf3D_Outfit_Bottom: THREE.Material;
        "Wolf3D_Outfit_Bottom.002"?: THREE.Material;
        Wolf3D_Outfit_Footwear: THREE.Material;
        "Wolf3D_Outfit_Footwear.002"?: THREE.Material;
        Wolf3D_Outfit_Top: THREE.Material;
    };
}

interface AvatarModelProps extends ModelProps {}

export const AvatarModel: FC<AvatarModelProps> = memo(({ scale, position }) => {
    const { nodes, materials } = useGLTF(
        "/3d-models/avatar.glb",
    ) as unknown as GLTFResult;
    const { speechtext, animation, setAnimation, setSpeechtext } =
        useSpeechAvatar();

    //Animations
    const { animations: idleAnimations } = useFBX("/3d-animations/Idle.fbx");
    const { animations: talkingAnimations } = useFBX(
        "/3d-animations/Talking.fbx",
    );

    idleAnimations[0].name = "Idle";
    talkingAnimations[0].name = "Talking";

    const groupRef = useRef<THREE.Group>(null);
    const currentViseme = useRef<string | null>(null);
    const visemeStartTime = useRef<number>(0);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

    const { actions } = useAnimations(
        [idleAnimations[0], talkingAnimations[0]],
        groupRef,
    );

    // Reset lipsync
    const resetLipSync = () => {
        currentViseme.current = null;
        visemeStartTime.current = 0;

        if (
            nodes.Wolf3D_Head?.morphTargetDictionary &&
            nodes.Wolf3D_Head?.morphTargetInfluences
        ) {
            Object.keys(nodes.Wolf3D_Head.morphTargetDictionary).forEach(
                (key) => {
                    const index = nodes.Wolf3D_Head.morphTargetDictionary[key];
                    if (index !== undefined) {
                        if (
                            nodes.Wolf3D_Head.morphTargetInfluences[index] !==
                            undefined
                        ) {
                            nodes.Wolf3D_Head.morphTargetInfluences[index] = 0;
                        }
                        if (
                            nodes.Wolf3D_Teeth?.morphTargetInfluences[index] !==
                            undefined
                        ) {
                            nodes.Wolf3D_Teeth.morphTargetInfluences[index] = 0;
                        }
                    }
                },
            );
        }
    };

    // Lip sync
    useEffect(() => {
        timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
        timeoutsRef.current = [];

        if (speechtext.length === 0) {
            resetLipSync();
            return;
        }

        const extractedVisemes = extractViseme(speechtext);
        let timeOffset = 0;

        extractedVisemes.forEach((visemeData, i) => {
            const viseme = visemeData.viseme;
            if (!viseme) return;

            const timeout = setTimeout(() => {
                currentViseme.current = viseme;
                visemeStartTime.current = Date.now();

                if (i === extractedVisemes.length - 1) {
                    const finalTimeout = setTimeout(() => {
                        resetLipSync();
                        setAnimation("Idle");
                        setSpeechtext("");
                    }, 150);
                    timeoutsRef.current.push(finalTimeout);
                }
            }, timeOffset);

            timeoutsRef.current.push(timeout);
            timeOffset += 100;
        });

        // Cleanup
        return () => {
            timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
            timeoutsRef.current = [];
        };
    }, [
        speechtext,
        setAnimation,
        setSpeechtext,
        nodes.Wolf3D_Head,
        nodes.Wolf3D_Teeth,
    ]);

    useFrame(() => {
        if (
            !nodes.Wolf3D_Head?.morphTargetDictionary ||
            !nodes.Wolf3D_Head?.morphTargetInfluences ||
            !nodes.Wolf3D_Teeth?.morphTargetInfluences
        ) {
            return;
        }

        const morphTargetDict = nodes.Wolf3D_Head.morphTargetDictionary;

        // Reset all visemes to 0 if no speech is detected
        if (speechtext.length === 0) {
            Object.keys(morphTargetDict).forEach((key) => {
                const index = morphTargetDict[key];
                if (index === undefined) return;

                if (
                    nodes.Wolf3D_Head.morphTargetInfluences[index] !== undefined
                ) {
                    nodes.Wolf3D_Head.morphTargetInfluences[index] =
                        THREE.MathUtils.lerp(
                            nodes.Wolf3D_Head.morphTargetInfluences[index],
                            0,
                            0.15,
                        );
                }
                if (
                    nodes.Wolf3D_Teeth.morphTargetInfluences[index] !==
                    undefined
                ) {
                    nodes.Wolf3D_Teeth.morphTargetInfluences[index] =
                        THREE.MathUtils.lerp(
                            nodes.Wolf3D_Teeth.morphTargetInfluences[index],
                            0,
                            0.15,
                        );
                }
            });
            return;
        }

        if (currentViseme.current) {
            const currentIndex = morphTargetDict[currentViseme.current];

            if (currentIndex !== undefined) {
                if (
                    nodes.Wolf3D_Head.morphTargetInfluences[currentIndex] !==
                    undefined
                ) {
                    nodes.Wolf3D_Head.morphTargetInfluences[currentIndex] =
                        THREE.MathUtils.lerp(
                            nodes.Wolf3D_Head.morphTargetInfluences[
                                currentIndex
                            ],
                            1,
                            0.5,
                        );
                }
                if (
                    nodes.Wolf3D_Teeth.morphTargetInfluences[currentIndex] !==
                    undefined
                ) {
                    nodes.Wolf3D_Teeth.morphTargetInfluences[currentIndex] =
                        THREE.MathUtils.lerp(
                            nodes.Wolf3D_Teeth.morphTargetInfluences[
                                currentIndex
                            ],
                            1,
                            0.5,
                        );
                }

                // Reset other visemes to 0
                Object.keys(morphTargetDict).forEach((key) => {
                    if (key !== currentViseme.current) {
                        const otherIndex = morphTargetDict[key];
                        if (otherIndex === undefined) return;

                        if (
                            nodes.Wolf3D_Head.morphTargetInfluences[
                                otherIndex
                            ] !== undefined
                        ) {
                            nodes.Wolf3D_Head.morphTargetInfluences[
                                otherIndex
                            ] = THREE.MathUtils.lerp(
                                nodes.Wolf3D_Head.morphTargetInfluences[
                                    otherIndex
                                ],
                                0,
                                0.3,
                            );
                        }
                        if (
                            nodes.Wolf3D_Teeth.morphTargetInfluences[
                                otherIndex
                            ] !== undefined
                        ) {
                            nodes.Wolf3D_Teeth.morphTargetInfluences[
                                otherIndex
                            ] = THREE.MathUtils.lerp(
                                nodes.Wolf3D_Teeth.morphTargetInfluences[
                                    otherIndex
                                ],
                                0,
                                0.3,
                            );
                        }
                    }
                });

                // Reset visem after 80ms
                if (Date.now() - visemeStartTime.current > 80) {
                    currentViseme.current = null;
                }
            }
        } else {
            // Reset all visemes to 0 after 80ms if no viseme is active
            Object.keys(morphTargetDict).forEach((key) => {
                const index = morphTargetDict[key];
                if (index === undefined) return;

                if (
                    nodes.Wolf3D_Head.morphTargetInfluences[index] !== undefined
                ) {
                    nodes.Wolf3D_Head.morphTargetInfluences[index] =
                        THREE.MathUtils.lerp(
                            nodes.Wolf3D_Head.morphTargetInfluences[index],
                            0,
                            0.2,
                        );
                }
                if (
                    nodes.Wolf3D_Teeth.morphTargetInfluences[index] !==
                    undefined
                ) {
                    nodes.Wolf3D_Teeth.morphTargetInfluences[index] =
                        THREE.MathUtils.lerp(
                            nodes.Wolf3D_Teeth.morphTargetInfluences[index],
                            0,
                            0.2,
                        );
                }
            });
        }
    });

    useEffect(() => {
        const currentAction = actions[animation];

        if (currentAction) {
            currentAction.reset().fadeIn(0.5).play();
        }

        return () => {
            if (currentAction) {
                currentAction.fadeOut(0.5);
            }
        };
    }, [animation, actions]);

    return (
        <group dispose={null} ref={groupRef} scale={scale} position={position}>
            <primitive object={nodes.Hips} />
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
    );
});

AvatarModel.displayName = "AvatarModel";

useGLTF.preload("/3d-models/avatar.glb");
