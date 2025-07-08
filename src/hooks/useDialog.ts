import { create } from "zustand";

type DialogState = {
    open: boolean;
    email: string;
};

type DialogActions = {
    setDialogState: (state: boolean) => void;
    setEmail: (value: string) => void;
};

type DialogStore = DialogState & DialogActions;

export const useDialog = create<DialogStore>()((set, get) => ({
    open: false,
    email: "",

    //actions
    setDialogState: (state: boolean) => set({ open: state }),
    setEmail: (value: string) => set({ email: value }),
}));
