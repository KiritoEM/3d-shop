"use client";

import { create } from "zustand";

type SidebarState = {
    closed: boolean;
    isSidebarResponsiveOpen: boolean;
};

type SidebarActions = {
    setSidebarState: (state: boolean) => void;
    setResponsiveSidebarState: (state: boolean) => void;
};

type SidebarStore = SidebarState & SidebarActions;

const useSidebar = create<SidebarStore>((set) => ({
    closed: false,
    isSidebarResponsiveOpen: false,

    //actions
    setSidebarState: (state: boolean) => set({ closed: state }),
    setResponsiveSidebarState: (state: boolean) =>
        set({ isSidebarResponsiveOpen: state }),
}));

export { useSidebar };
