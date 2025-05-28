import { create } from "zustand";

type SoundState = {
    isPlaying: boolean;
    togglePlaySound: () => void;
}

const usePlaySound = create<SoundState>((set) => ({
    isPlaying: false,
    togglePlaySound: () => set((state) => ({ isPlaying: !state.isPlaying })),
}))

export default usePlaySound;