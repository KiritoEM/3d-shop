"use client";

import { create } from "zustand";

type StepperState = {
    currentStep: number;
    isComplete: boolean;
    stepsLength: number;
};

type StepperActions = {
    setStep: (step: number) => void;
    setStepsLength: (length: number) => void;
    setIsComplete: () => void;
};

type StepperStore = StepperState & StepperActions;

const useStepper = create<StepperStore>((set, get) => ({
    currentStep: 1,
    isComplete: false,
    stepsLength: 2,

    //Actions
    setStepsLength: (length: number) => set({ stepsLength: length }),
    setStep: (step: number) =>
        set((state) => {
            if (state.currentStep !== state.stepsLength) {
                return { currentStep: step };
            } else {
                get().setIsComplete();
                return state;
            }
        }),
    setIsComplete: () => set({ isComplete: true }),
}));

export { useStepper };
