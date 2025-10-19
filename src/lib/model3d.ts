import * as THREE from "three";
import { GLTF, GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { I3DMaterial, IGLTFModel } from "@/types";
import { getToast } from "./file-utils";
import path from "path";

export const loadBlobModel = (
    arrayBuffer: ArrayBuffer,
): Promise<IGLTFModel> => {
    return new Promise((resolve, reject) => {
        const gltfLoader = new GLTFLoader();
        gltfLoader.parse(arrayBuffer, "/", (gltf: GLTF) => {
            let materials: { [key: string]: THREE.Material } = {};

            gltf.scene.traverse((child) => {
                if (isMesh(child)) {
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

export const ExportBlobIntoArrayBuffer = async (
    model: IGLTFModel,
): Promise<ArrayBuffer> => {
    if (!model) return new ArrayBuffer(0);

    const gltfExporter = new GLTFExporter();

    return new Promise((resolve, reject) => {
        gltfExporter.parse(
            model.scene,
            (result) => {
                if (result instanceof ArrayBuffer) {
                    resolve(result);
                }
            },
            (error) => {
                console.error("Error exporting gltf:", error);
                reject(error);
            },
            {
                binary: true,
            },
        );
    });
};

export const validate3DModel = (file: File, maxSize?: number): boolean => {
    if (!file) return false;

    const extname = path.extname(file.name).slice(1);

    if (extname !== "glb" && extname !== "gltf") {
        getToast({ type: "TYPE_ERROR", fileType: "MODEL_3D" });
        return false;
    }

    if (maxSize && file.size > maxSize) {
        getToast({
            type: "SIZE-ERROR",
            maxSize: Math.round(maxSize / 1024 / 1024),
        });
        return false;
    }

    return true;
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

export const isMesh = (child: unknown): child is THREE.Mesh => {
    return child instanceof THREE.Mesh;
};
