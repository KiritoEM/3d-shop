"use client";

import { create } from "zustand";

type StudioState = {
    model: Record<string, any> | null;
    arrayBuffer: ArrayBuffer | null;
};

type StudioActions = {
    setModel: (model: Record<string, any>) => void;
    setArrayBuffer: (arrayBuffer: ArrayBuffer) => void;
};

type StudioStore = StudioState & StudioActions;

export const useStudio = create<StudioStore>((set) => ({
    model: null,
    arrayBuffer: null,

    //Actions
    setModel: (model: Record<string, any>) => set({ model: model }),
    setArrayBuffer: (arrayBuffer: ArrayBuffer) => set({ arrayBuffer }),
}));
