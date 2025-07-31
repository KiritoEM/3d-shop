import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { I3DMaterial, IGLTFModel } from "@/types";

export const loadBlobModel = (
    arrayBuffer: ArrayBuffer,
): Promise<IGLTFModel> => {
    return new Promise((resolve, reject) => {
        const gltfLoader = new GLTFLoader();
        gltfLoader.parse(arrayBuffer, "/", (gltf: GLTF) => {
            let materials: { [key: string]: THREE.Material } = {};

            gltf.scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    const meshMaterials = Array.isArray(child.material)
                        ? child.material
                        : [child.material];

                    meshMaterials.forEach((material: THREE.Material) => {
                        const materialName = material.name;
                        materials[materialName] = material;
                    });
                }
            });

            if (!Object.keys(gltf).length) {
                reject(new Error("No gltf extracted from uploaded models"));
            }

            resolve({
                scene: gltf.scene,
                animations: gltf.animations,
                materials,
            });
        });
    });
};

export const transformMaterialsIntoArray = (
    materials: IGLTFModel["materials"],
): I3DMaterial[] => {
    return Object.entries(materials).map(([key, value]) => ({
        name: key,
        type: value.type,
    }));
};

export const hasColorProperty = (
    material: THREE.Material,
): material is
    | THREE.MeshStandardMaterial
    | THREE.MeshPhongMaterial
    | THREE.MeshBasicMaterial => {
    return "color" in material && material.color instanceof THREE.Color;
};

export const isMeshExisting = (
    selectedMesh: THREE.Mesh[],
    meshToCompare: THREE.Mesh,
) => {
    return selectedMesh.some(
        (meshItem) => meshItem.uuid === meshToCompare.uuid,
    );
};

export const isMaterialTransparent = (
    material: THREE.Material,
): material is THREE.MeshPhysicalMaterial => {
    return (
        material.transparent ||
        (material.opacity !== undefined && material.opacity < 1) ||
        (material.type === "MeshPhysicalMaterial" &&
            (material as THREE.MeshPhysicalMaterial).transmission > 0)
    );
};
