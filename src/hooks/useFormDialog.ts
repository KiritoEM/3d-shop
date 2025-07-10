import { use } from "react";
import { create } from "zustand";

type StatusType = "success" | "failed";

type DialogState = {
    open: boolean;
    email: string;
    status: StatusType;
};

type DialogActions = {
    setDialogState: (state: boolean) => void;
    setEmail: (value: string) => void;
    setStatus: (status: StatusType) => void;
};

type DialogStore = DialogState & DialogActions;

const useFormDialog = create<DialogStore>()((set, get) => ({
    open: false,
    email: "",
    status: "failed",

    //actions
    setDialogState: (state: boolean) => set({ open: state }),
    setEmail: (value: string) => set({ email: value }),
    setStatus: (status: StatusType) => set({ status }),
}));

export default useFormDialog;
