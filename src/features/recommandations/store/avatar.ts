"use client";

import { IAnimations } from "@/components/3d-models/types";
import { create } from "zustand";

export type SpeechAvatarState = {
    speechtext: string;
    animation: IAnimations;
};

type SpeechAvatarActions = {
    setSpeechtext: (value: string) => void;
    setAnimation: (animation: IAnimations) => void;
};

export type SpeechAvatarStore = SpeechAvatarState & SpeechAvatarActions;

export const useSpeechAvatar = create<SpeechAvatarStore>()((set, get) => ({
    speechtext: "",
    animation: "Idle",

    //Actions
    setSpeechtext: (value: string) => set({ speechtext: value }),
    setAnimation: (animation: IAnimations) => set({ animation: animation }),
}));
