import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const loadBlobModel = (
    arrayBuffer: ArrayBuffer,
): Record<string, any> => {
    let modelData: Record<string, any> = {};

    const gltfLoader = new GLTFLoader();
    gltfLoader.parse(arrayBuffer, "/", (gltf) => {
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

        modelData = {
            scene: gltf.scene,
            animations: gltf.animations,
            materials,
        };
    });

    return modelData;
};
