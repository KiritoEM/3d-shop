import React, { FC, Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Environment, Center, Resize } from "@react-three/drei";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { useStudio } from "@/features/3d-studio/hooks/studio";
import Loader from "../Loader";
import Controller from "./Controller";
import { IGLTFModel } from "@/types";
import { toast } from "react-toastify";

interface MaterialInfo {
    name: string;
    type: string;
}

interface ProductViewCanvasProps {
    model: IGLTFModel;
}

const StudioViewCanvas: FC<ProductViewCanvasProps> = ({
    model,
}): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [hoveredMesh, setHoveredMesh] = useState<THREE.Mesh[]>([]);
    const [selectedMesh, setSelectedMesh] = useState<THREE.Mesh[]>([]); //clicked Mesh
    const { selectedMaterials, setSelectedMaterial } = useStudio();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scene, materials } = model;

    const hasColorProperty = (
        material: THREE.Material,
    ): material is
        | THREE.MeshStandardMaterial
        | THREE.MeshPhongMaterial
        | THREE.MeshBasicMaterial => {
        return "color" in material && material.color instanceof THREE.Color;
    };

    const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHoveredMesh([]);
    };

    const isMeshExisting = (
        selectedMesh: THREE.Mesh[],
        meshToCompare: THREE.Mesh,
    ) => {
        return selectedMesh.some(
            (meshItem) => meshItem.uuid === meshToCompare.uuid,
        );
    };

    const isTransparent = (
        material: THREE.Material,
    ): material is THREE.MeshPhysicalMaterial => {
        return (
            material.transparent ||
            (material.opacity !== undefined && material.opacity < 1) ||
            (material.type === "MeshPhysicalMaterial" &&
                (material as THREE.MeshPhysicalMaterial).transmission > 0)
        );
    };

    const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        const mesh = e.object as THREE.Mesh;
        if (mesh instanceof THREE.Mesh) {
            const material = Array.isArray(mesh.material)
                ? mesh.material[0]
                : mesh.material;

            if (!isTransparent(material)) {
                setHoveredMesh([mesh]);
            } else {
                setHoveredMesh([]);
                return;
            }
        }
    };

    const handleClick = (e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();

        const mesh = e.object as THREE.Mesh;
        if (mesh instanceof THREE.Mesh) {
            if (isMeshExisting(selectedMesh, mesh)) {
                setSelectedMesh((prev) =>
                    prev.filter((meshItem) => meshItem.uuid !== mesh.uuid),
                );
            } else {
                // Add the mesh to selectedMesh
                setSelectedMesh((prev) => [...prev, mesh]);

                const materials = Array.isArray(mesh.material)
                    ? mesh.material
                    : [mesh.material];

                // Add material to selectedMaterial
                materials.forEach((material) => {
                    if (
                        hasColorProperty(material) &&
                        !isTransparent(material)
                    ) {
                        const currentMaterialSelected: MaterialInfo = {
                            name: material.name,
                            type: material.type,
                        };
                        setSelectedMaterial(currentMaterialSelected);
                    } else {
                        toast(
                            "Les objets transparents ne sont pas modifiables",
                            {
                                type: "warning",
                            },
                        );
                    }
                });
            }
        }
    };

    useEffect(() => {
        if (scene) {
            setTimeout(() => {
                setIsLoaded(true);
            }, 1400);
        }
    }, [scene]);

    return (
        <div className="relative z-20 h-full w-full">
            {!isLoaded && <Loader />}
            <Canvas
                ref={canvasRef}
                shadows
                style={{
                    width: "100%",
                    height: "100%",
                    opacity: isLoaded ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                }}
                gl={{
                    antialias: true,
                    alpha: true,
                    preserveDrawingBuffer: true,
                    autoClear: false,
                }}
                camera={{
                    fov: 25,
                    position: [-2, 0, 0],
                    near: 0.1,
                    far: 1000,
                }}
            >
                <color attach="background" args={["#1c1c1c"]} />
                <fog attach="fog" args={["#1c1c1c", 10, 20]} />
                <Environment preset="warehouse" environmentIntensity={0.84} />
                <Controller />

                <Suspense fallback={<Loader />}>
                    <Center>
                        <Resize scale={0.46}>
                            <primitive
                                object={scene}
                                onPointerOver={handlePointerOver}
                                onPointerOut={handlePointerOut}
                                onClick={handleClick}
                            />
                        </Resize>
                    </Center>
                </Suspense>

                <EffectComposer autoClear={false}>
                    {hoveredMesh.length || selectedMesh.length ? (
                        <Outline
                            xRay={false}
                            selection={[
                                ...(selectedMesh ?? []),
                                ...(hoveredMesh ?? []),
                            ]}
                            edgeStrength={7}
                            pulseSpeed={0.0}
                            blur
                            visibleEdgeColor={0xffff00}
                            hiddenEdgeColor={0xcccc00}
                        />
                    ) : (
                        <></>
                    )}
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default StudioViewCanvas;
