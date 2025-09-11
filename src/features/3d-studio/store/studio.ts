import { create } from "zustand";
import * as THREE from "three";
import { I3DMaterial, IGLTFModel } from "@/types";
import { CAMERA_ZOOM } from "@/constants/constants";
import { RefObject } from "react";

type ICameraActions = "ZOOM_IN" | "ZOOM_OUT";

type StudioState = {
    model: IGLTFModel | null;
    arrayBuffer: ArrayBuffer | null;
    cameraDistance: number;
    cameraUpdated: boolean;
    selectedMaterials: I3DMaterial[];
    materialToCustomize: I3DMaterial | null;
    selectedMeshs: THREE.Mesh[];
    hoveredMeshs: THREE.Mesh[];
    canvasRef: RefObject<any> | null;
    isFlipped?: boolean;
};

type StudioActions = {
    setModel: (model: IGLTFModel) => void;
    setCameraAction: (action: ICameraActions) => void;
    setCameraUpdated: () => void;
    setArrayBuffer: (arrayBuffer: ArrayBuffer) => void;
    setCameraDistance: (distance: number) => void;
    setSelectedMaterial: (material: I3DMaterial) => void;
    setMaterialToCustomize: (material: I3DMaterial) => void;
    setSelectedMaterials: (materials: I3DMaterial[]) => void;
    setHoveredMeshs: (meshs: THREE.Mesh[]) => void;
    setSelectedMeshs: (meshs: THREE.Mesh[] | any) => void;
    setCanvasRef: (ref: RefObject<any> | null) => void;
    setIsFlipped: (state: boolean) => void;
    resetSelectedMaterials: () => void;
    resetSelectedMeshs: () => void;
    resetHoveredMeshs: () => void;
    resetMaterialToCustomize: () => void;
};

type StudioStore = StudioState & StudioActions;

export const useStudio = create<StudioStore>((set, get) => ({
    model: null,
    arrayBuffer: null,
    cameraDistance: 2,
    cameraUpdated: false,
    selectedMaterials: [],
    selectedMeshs: [],
    hoveredMeshs: [],
    materialToCustomize: null,
    canvasRef: null,
    isFlipped: false,

    // Actions
    setModel: (model: IGLTFModel) => set({ model }),
    setArrayBuffer: (arrayBuffer: ArrayBuffer) => set({ arrayBuffer }),
    setCameraUpdated: () => set({ cameraUpdated: true }),
    setCameraDistance: (distance: number) => set({ cameraDistance: distance }),
    setCameraAction: (action: ICameraActions) => {
        const currentDistance = get().cameraDistance;
        const zoomStep = CAMERA_ZOOM - 0.24;

        switch (action) {
            case "ZOOM_IN":
                return set({
                    cameraDistance: Math.max(currentDistance - zoomStep, 1.34),
                    cameraUpdated: true,
                });
            case "ZOOM_OUT":
                return set({
                    cameraDistance: Math.min(currentDistance + zoomStep, 2.4),
                    cameraUpdated: true,
                });
            default:
                return get();
        }
    },
    setSelectedMaterials: (materials: I3DMaterial[]) =>
        set({ selectedMaterials: materials }),
    setSelectedMaterial: (material: I3DMaterial) =>
        set((state) => ({
            ...state,
            selectedMaterials: state.selectedMaterials.some(
                (item) => item.name === material.name,
            )
                ? state.selectedMaterials //make material unique
                : [...state.selectedMaterials, material],
        })),
    setMaterialToCustomize: (material: I3DMaterial) =>
        set({ materialToCustomize: material }),
    setHoveredMeshs: (meshs: THREE.Mesh[]) => set({ hoveredMeshs: meshs }),

    setSelectedMeshs: (meshs: THREE.Mesh[]) => set({ selectedMeshs: meshs }),
    setCanvasRef: (ref: RefObject<any> | null) => set({ canvasRef: ref }),
    setIsFlipped: (state: boolean) => set({ isFlipped: state }),
    resetSelectedMaterials: () => set({ selectedMaterials: [] }),
    resetSelectedMeshs: () => set({ selectedMeshs: [] }),
    resetHoveredMeshs: () => set({ hoveredMeshs: [] }),
    resetMaterialToCustomize: () => set({ materialToCustomize: null }),
}));
