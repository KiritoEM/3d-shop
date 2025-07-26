"use client";

import { create } from "zustand";
import { IGLTFModel } from "@/types";

type StudioState = {
    model: IGLTFModel | null;
    arrayBuffer: ArrayBuffer | null;
};

type StudioActions = {
    setModel: (model: IGLTFModel) => void;
    setArrayBuffer: (arrayBuffer: ArrayBuffer) => void;
};

type StudioStore = StudioState & StudioActions;

export const useStudio = create<StudioStore>((set) => ({
    model: null,
    arrayBuffer: null,

    //Actions
    setModel: (model: IGLTFModel) => set({ model }),
    setArrayBuffer: (arrayBuffer: ArrayBuffer) => set({ arrayBuffer }),
}));
