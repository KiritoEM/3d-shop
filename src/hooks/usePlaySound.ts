import { create } from "zustand";

type SoundState = {
    isPlaying: boolean;
};

type SoundActions = {
    togglePlaySound: () => void;
};

export type SoundStore = SoundState & SoundActions;

const usePlaySound = create<SoundStore>((set) => ({
    isPlaying: false,
    togglePlaySound: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));

export default usePlaySound;
