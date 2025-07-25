"use client";

import { create } from "zustand";
import { IObjectEntity } from "@/types";

type StudioState = {
    model: Record<string, any> | null;
};

type StudioActions = {
    setModel: (model: Record<string, any>) => void;
};

type StudioStore = StudioState & StudioActions;

export const useStudio = create<StudioStore>((set) => ({
    model: null,

    //Actions
    setModel: (model: Record<string, any>) => set({ model: model }),
}));
