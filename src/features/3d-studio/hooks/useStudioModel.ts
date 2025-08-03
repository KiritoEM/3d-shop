"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import { I3DMaterial, IGLTFModel } from "@/types";
import { hasColorProperty, isMesh, isMeshExisting } from "@/lib/model3d";
import { useStudio } from "@/features/3d-studio/hooks/useStudio";

const useStudioModel = (scene: IGLTFModel["scene"]) => {
    const {
        selectedMeshs,
        materialToCustomize,
        setSelectedMeshs,
        setHoveredMeshs,
        setSelectedMaterials,
        resetSelectedMaterials,
        resetSelectedMeshs,
        resetHoveredMeshs,
        resetMaterialToCustomize,
    } = useStudio();

    useEffect(() => {
        if (selectedMeshs.length === 0) {
            resetMaterialToCustomize();
            resetSelectedMaterials();
            return;
        }

        const newMaterials: I3DMaterial[] = [];

        selectedMeshs.forEach((mesh) => {
            const materials = Array.isArray(mesh.material)
                ? mesh.material
                : [mesh.material];

            materials.forEach((material) => {
                if (hasColorProperty(material)) {
                    const materialObj: I3DMaterial = {
                        name: material.name,
                        type: material.type,
                        color: material.color.getHexString(),
                    };

                    if (
                        !newMaterials.some((m) => m.name === materialObj.name)
                    ) {
                        newMaterials.push(materialObj);
                    }
                }
            });
        });

        setSelectedMaterials(newMaterials);
    }, [selectedMeshs, setSelectedMaterials, resetSelectedMaterials]);

    //change material by configurator
    useEffect(() => {
        if (materialToCustomize) {
            scene.traverse((child) => {
                if (isMesh(child)) {
                    const meshMaterials = Array.isArray(child.material)
                        ? child.material
                        : [child.material];

                    meshMaterials.forEach((material: THREE.Material) => {
                        if (
                            hasColorProperty(material) &&
                            materialToCustomize.name === material.name
                        ) {
                            material.color.set(
                                materialToCustomize.updatedColor as string,
                            );
                            material.needsUpdate = true;
                        }
                    });
                }
            });
        }
    }, [materialToCustomize]);

    const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        resetHoveredMeshs();
    };

    const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        const mesh = e.object;
        if (isMesh(mesh)) {
            setHoveredMeshs([mesh]);
        }
    };

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        resetMaterialToCustomize();

        const mesh = e.object;
        if (isMesh(mesh)) {
            if (isMeshExisting(selectedMeshs, mesh)) {
                setSelectedMeshs(
                    selectedMeshs.filter(
                        (meshItem) => meshItem.uuid !== mesh.uuid,
                    ),
                );
            } else {
                //multiple selection using ctrlKey
                if (e.ctrlKey) {
                    setSelectedMeshs([...selectedMeshs, mesh]);
                } else {
                    setSelectedMeshs([mesh]);
                }
            }
        }
    };

    const handlePointerMissed = () => {
        resetMaterialToCustomize();
        resetSelectedMeshs();
        resetHoveredMeshs();
    };

    return {
        handlePointerOver,
        handleClick,
        handlePointerOut,
        handlePointerMissed,
    };
};

export default useStudioModel;
