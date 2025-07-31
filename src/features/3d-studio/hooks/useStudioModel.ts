"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import { I3DMaterial } from "@/types";
import { hasColorProperty, isMeshExisting } from "@/lib/model3d";
import { useStudio } from "@/features/3d-studio/hooks/useStudio";

const useStudioModel = () => {
    const {
        selectedMeshs,
        setSelectedMeshs,
        setHoveredMeshs,
        setSelectedMaterials,
        resetSelectedMaterials,
        resetSelectedMeshs,
    } = useStudio();

    useEffect(() => {
        if (selectedMeshs.length === 0) {
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

    const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        resetSelectedMeshs();
    };

    const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        const mesh = e.object as THREE.Mesh;
        if (mesh instanceof THREE.Mesh) {
            setHoveredMeshs([mesh]);
        }
    };

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();

        const mesh = e.object as THREE.Mesh;
        if (mesh instanceof THREE.Mesh) {
            if (isMeshExisting(selectedMeshs, mesh)) {
                setSelectedMeshs(
                    selectedMeshs.filter(
                        (meshItem) => meshItem.uuid !== mesh.uuid,
                    ),
                );
            } else {
                if (e.ctrlKey) {
                    setSelectedMeshs([...selectedMeshs, mesh]);
                } else {
                    setSelectedMeshs([mesh]);
                }
            }
        }
    };

    const handlePointerMissed = () => {
        resetSelectedMeshs();
    };

    return {
        handlePointerOver,
        handleClick,
        handlePointerOut,
        handlePointerMissed,
    };
};

export default useStudioModel;
