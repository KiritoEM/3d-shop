"use client";

import { FC, RefObject, useEffect, useRef, useState } from "react";
import { IStep } from "@/types";
import { cn } from "@/lib/utils";
import { useStepper } from "@/store/stepper";

type IMargins = {
    marginLeft: number;
    marginRight: number;
};

type ICustomIndicatorNode = (step: number, stepIndex: number) => JSX.Element;

export interface StepperProps extends React.ComponentProps<"div"> {
    steps: IStep[];
    stepperIndicatorsClass?: string;
    renderCustomIndicatorNode?: ICustomIndicatorNode;
}

const Stepper: FC<StepperProps> = ({
    steps,
    className,
    stepperIndicatorsClass,
    renderCustomIndicatorNode,
    ...props
}): JSX.Element => {
    const { currentStep, isComplete, setStepsLength } = useStepper();
    const [margins, setMargins] = useState<IMargins>({
        marginLeft: 0,
        marginRight: 0,
    });
    const stepsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        setStepsLength(steps.length); //add steps length to store
    }, [steps.length]);

    useEffect(() => {
        setMargins({
            marginLeft: stepsRef.current[0].offsetWidth / 2,
            marginRight: stepsRef.current[steps.length - 1].offsetWidth / 2,
        });
    }, [stepsRef, steps.length]);

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

            <div className="stepper__component mx-auto mt-16 w-fit">
                <ActiveComponent />
            </div>
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
    renderCustomIndicatorNode?: ICustomIndicatorNode;
}

const StepperIndicators: FC<StepperIndicators> = ({
    className,
    steps,
    stepsRef,
    currentStep,
    isComplete,
    margins,
    renderCustomIndicatorNode,
}): JSX.Element => {
    const calculateProgressBar = () => {
        return ((currentStep - 1) / (steps.length - 1)) * 100;
    };
    return (
        <div
            className={cn(
                "stepper__indicators relative mx-auto flex max-w-[800px] items-center justify-between",
                className,
            )}
        >
            {steps.map((step, index) => (
                <div className="step relative flex flex-col space-y-3">
                    {renderCustomIndicatorNode ? (
                        renderCustomIndicatorNode(index + 1, currentStep)
                    ) : (
                        <div
                            key={step.name}
                            ref={(el: HTMLDivElement) => {
                                stepsRef.current[index] = el;
                            }}
                            className={cn(
                                "step__numerotation bg-gray font-michroma relative z-20 grid h-9 w-9 cursor-pointer place-content-center rounded-full text-[15px]",
                                (currentStep >= index + 1 || isComplete) &&
                                    "bg-primary",
                            )}
                        >
                            <p className="step__number">
                                {" "}
                                {currentStep > index + 1 || isComplete ? (
                                    <span>&#10003;</span>
                                ) : (
                                    index + 1
                                )}
                            </p>
                        </div>
                    )}

                    <p
                        className={cn(
                            "step__name text-muted-foreground absolute left-1/2 top-12 w-max -translate-x-1/2 text-[15px]",
                            currentStep >= index + 1 ||
                                (isComplete && "text-primary"),
                        )}
                    >
                        {step.name}
                    </p>
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
                    className="progress-bar__bar bg-primary h-full transition-all duration-300 ease-out"
                />
            </div>
        </div>
    );
};

export { Stepper };
