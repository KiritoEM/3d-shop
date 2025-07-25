"use client";

import { create } from "zustand";
import { IObjectEntity } from "@/types";

type StepperState = {
    currentStep: number;
    isComplete: boolean;
    stepsLength: number;
    formData: Record<string, any>;
};

type StepperActions = {
    setStep: (step: number) => void;
    setStepsLength: (length: number) => void;
    setIsComplete: () => void;
    setFormData: (formData: IObjectEntity) => void;
};

type StepperStore = StepperState & StepperActions;

const useStepper = create<StepperStore>((set, get) => ({
    currentStep: 1,
    isComplete: false,
    stepsLength: 2,
    formData: {},

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
    setFormData: (formData: IObjectEntity) => {
        return set((state) => ({
            formData: {
                ...state.formData,
                [formData.key]: formData.value,
            },
        }));
    },
}));

export { useStepper };
