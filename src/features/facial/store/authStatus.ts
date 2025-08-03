"use client";

import { create } from "zustand";

export type IAuthStatus = "Authentificated" | "Unknow" | "Pending";
type ISessionCreated = "Created" | "Error" | "Pending";

type AuthentificationStatusState = {
    authStatus: IAuthStatus;
    facialId: string | null;
    sessionCreated: ISessionCreated;
};

type AuthentificationStatusActions = {
    setAuthStatus: (status: IAuthStatus) => void;
    setFacialId: (status: string) => void;
    setSessionState: (state: ISessionCreated) => void;
};

type AuthentificationStatusStore = AuthentificationStatusState &
    AuthentificationStatusActions;

export const useAuthentificationStatus = create<AuthentificationStatusStore>(
    (set) => ({
        authStatus: "Pending",
        facialId: null,
        sessionCreated: "Pending",

        //actions
        setAuthStatus: (status: IAuthStatus) => set({ authStatus: status }),
        setFacialId: (id: string) => set({ facialId: id as string }),
        setSessionState: (state: ISessionCreated) =>
            set({ sessionCreated: state }),
    }),
);
