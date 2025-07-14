"use client";

import { create } from "zustand";

type SidebarState = {
    closed: boolean;
};

type SidebarActions = {
    setSidebarState: (state: boolean) => void;
};

type SidebarStore = SidebarState & SidebarActions;

const useSidebar = create<SidebarStore>((set) => ({
    closed: false,
    setSidebarState: (state: boolean) => set({ closed: state }),
}));

export default useSidebar;
