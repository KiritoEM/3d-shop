import { create } from "zustand";
import { I3DMaterial, IGLTFModel } from "@/types";
import { CAMERA_ZOOM } from "@/constants/constants";

type ICameraActions = "ZOOM_IN" | "ZOOM_OUT";

type StudioState = {
    model: IGLTFModel | null;
    arrayBuffer: ArrayBuffer | null;
    cameraDistance: number;
    cameraUpdated: boolean;
    selectedMaterials: I3DMaterial[];
};

type StudioActions = {
    setModel: (model: IGLTFModel) => void;
    setCameraAction: (action: ICameraActions) => void;
    setCameraUpdated: () => void;
    setArrayBuffer: (arrayBuffer: ArrayBuffer) => void;
    setCameraDistance: (distance: number) => void;
    setSelectedMaterial: (material: I3DMaterial) => void;
};

type StudioStore = StudioState & StudioActions;

export const useStudio = create<StudioStore>((set, get) => ({
    model: null,
    arrayBuffer: null,
    cameraDistance: 2,
    cameraUpdated: false,
    selectedMaterials: [],

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
    setSelectedMaterial: (material: I3DMaterial) =>
        set((state) => ({
            ...state,
            selectedMaterials: !state.selectedMaterials.some(
                (item) => item.name !== material.name,
            )
                ? [...state.selectedMaterials, material]
                : state.selectedMaterials,
        })),
}));
