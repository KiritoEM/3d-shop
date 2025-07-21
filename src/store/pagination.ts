import { create } from "zustand";

type PaginationState = {
    take: number;
    skip: number;
};

type PaginationActions = {
    setPagination: (state: Partial<PaginationState>) => void;
};

type PaginationStore = PaginationState & PaginationActions;

const usePagination = create<PaginationStore>((set) => ({
    take: 10,
    skip: 0,

    //Actions
    setPagination: (state: Partial<PaginationState>) => set({ ...state }),
}));

export { usePagination };
