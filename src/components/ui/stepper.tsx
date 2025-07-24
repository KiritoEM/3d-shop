"use client";

import { FC, RefObject, useEffect, useRef, useState } from "react";
import { IStep } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type IMargins = {
    marginLeft: number;
    marginRight: number;
};

export interface StepperProps extends React.ComponentProps<"div"> {
    steps: IStep[];
    stepperIndicatorsClass?: string;
}

const Stepper: FC<StepperProps> = ({
    steps,
    className,
    stepperIndicatorsClass,
    ...props
}): JSX.Element => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [isComplete, setComplete] = useState<boolean>(false);
    const [margins, setMargins] = useState<IMargins>({
        marginLeft: 0,
        marginRight: 0,
    });
    const stepsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        setMargins({
            marginLeft: stepsRef.current[0].offsetWidth / 2,
            marginRight: stepsRef.current[steps.length - 1].offsetWidth / 2,
        });
    }, [stepsRef, steps.length]);

    const handleNextStep = () => {
        setCurrentStep((prevStep) => {
            if (prevStep !== steps.length) {
                return prevStep + 1;
            } else {
                setComplete(true);
                return prevStep;
            }
        });
    };

    const ActiveComponent = steps[currentStep - 1].component;

    return (
        <div className={cn("stepper", className)} {...props}>
            <StepperIndicators
                className={stepperIndicatorsClass ?? ""}
                steps={steps}
                currentStep={currentStep}
                isComplete={isComplete}
                stepsRef={stepsRef}
                margins={margins}
            />

            <div className="stepper__component mt-12">
                <ActiveComponent />
            </div>

            {!isComplete && (
                <Button className="btn" onClick={handleNextStep}>
                    {currentStep === steps.length ? "Finish" : "Next"}
                </Button>
            )}
        </div>
    );
};

interface StepperIndicators {
    className: string;
    steps: IStep[];
    stepsRef: RefObject<HTMLDivElement[]>;
    currentStep: number;
    isComplete: boolean;
    margins: IMargins;
}

const StepperIndicators: FC<StepperIndicators> = ({
    className,
    steps,
    stepsRef,
    currentStep,
    isComplete,
    margins,
}): JSX.Element => {
    const calculateProgressBar = () => {
        return ((currentStep - 1) / (steps.length - 1)) * 100;
    };
    return (
        <div
            className={cn(
                "stepper__indicator relative mx-auto flex max-w-[900px] items-center justify-between",
                className,
            )}
        >
            {steps.map((step, index) => (
                <div className="step flex flex-col space-y-3">
                    <div
                        key={step.name}
                        ref={(el: HTMLDivElement) => {
                            stepsRef.current[index] = el;
                        }}
                        className={cn(
                            "step__numerotation bg-gray font-michroma relative z-20 grid h-10 w-10 cursor-pointer place-content-center rounded-full text-sm",

                            (currentStep >= index + 1 || isComplete) &&
                                "bg-primary",
                        )}
                    >
                        <p className="step__number">
                            {" "}
                            {currentStep >= index + 1 || isComplete ? (
                                <span>&#10003;</span>
                            ) : (
                                index + 1
                            )}
                        </p>
                    </div>
                </div>
            ))}

            {/* Progress Bar */}
            <div
                className="progress-bar bg-gray absolute left-0 top-1/2 z-10 h-2 -translate-y-1/2"
                style={{
                    width: `calc(100% - ${
                        margins.marginLeft + margins.marginRight
                    }px)`,
                    marginLeft: margins.marginLeft,
                    marginRight: margins.marginRight,
                }}
            >
                <div
                    style={{ width: `${calculateProgressBar()}%` }}
                    className="progress-bar__bar bg-primary duration-3 h-full transition-all ease-out"
                />
            </div>
        </div>
    );
};

export { Stepper };
