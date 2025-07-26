import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { IGLTFModel } from "@/types";

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
