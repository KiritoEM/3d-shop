"use client"

import { create } from "zustand";

export type IChat = {
    role: string;
    message: string;
}

export type RecommandationState = {
    chats: IChat[];
    loading: boolean
}

type RecommandationActions = {
    setChat: (value: IChat) => void;
    setLoading: (value: boolean) => void;
    reset: () => void
}

export type RecommandationStore = RecommandationState & RecommandationActions;

export const useRecommandation = create<RecommandationStore>()(
    (set, get) => ({
        chats: [],
        loading: false,

        //Actions
        setChat: (value: IChat) => set((state) => ({ chats: [...state.chats, value] })),
        setLoading: (value: boolean) => set({ loading: value }),
        reset: () => set({ chats: [], loading: false })
    })
);