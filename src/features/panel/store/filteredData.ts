import { create } from "zustand";

type DataFilteredState = {
    year: number;
};

type DataFilteredActions = {
    setYear: (year: number) => void;
};

type DataFilteredStore = DataFilteredState & DataFilteredActions;

export const useFilterData = create<DataFilteredStore>((set) => ({
    year: new Date().getFullYear(),

    //ations
    setYear: (year: number) => set({ year }),
}));
