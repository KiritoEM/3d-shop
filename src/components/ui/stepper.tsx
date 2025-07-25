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
        setStepsLength(steps.length); // Add steps length to store
    }, [steps.length, setStepsLength]);

    useEffect(() => {
        if (
            stepsRef.current[0] &&
            stepsRef.current[steps.length - 1] &&
            steps.length > 0
        ) {
            setMargins({
                marginLeft: stepsRef.current[0].offsetWidth / 2,
                marginRight: stepsRef.current[steps.length - 1].offsetWidth / 2,
            });
        }
    }, [steps.length]);

    const ActiveComponent = steps[currentStep - 1]?.component;

    return (
        <div className={cn("stepper w-full", className)} {...props}>
            <StepperIndicators
                className={stepperIndicatorsClass ?? ""}
                steps={steps}
                stepsRef={stepsRef}
                margins={margins}
                isComplete={isComplete}
                renderCustomIndicatorNode={renderCustomIndicatorNode}
            />

            <div className="stepper__component mt-18">
                {ActiveComponent ? <ActiveComponent /> : null}
            </div>
        </div>
    );
};

interface StepperIndicators {
    className: string;
    steps: IStep[];
    stepsRef: RefObject<HTMLDivElement[]>;
    margins: IMargins;
    isComplete: boolean;
    renderCustomIndicatorNode?: ICustomIndicatorNode;
}

const StepperIndicators: FC<StepperIndicators> = ({
    className,
    steps,
    stepsRef,
    margins,
    isComplete,
    renderCustomIndicatorNode,
}): JSX.Element => {
    const { currentStep } = useStepper();

    return (
        <div
            className={cn(
                "stepper__indicators relative mx-auto flex max-w-[510px] items-center justify-between",
                className,
            )}
        >
            {steps.map((step, index) => (
                <div key={step.name} className="step relative">
                    {renderCustomIndicatorNode ? (
                        renderCustomIndicatorNode(index + 1, currentStep)
                    ) : (
                        <div
                            ref={(el: HTMLDivElement | null) => {
                                if (el) stepsRef.current[index] = el;
                            }}
                            className={cn(
                                "step__numeration bg-gray font-michroma relative z-20 grid h-9 w-9 cursor-pointer place-content-center rounded-full text-[15px]",
                                (currentStep >= index + 1 || isComplete) &&
                                    "bg-primary",
                            )}
                        >
                            <p className="step__number">
                                {currentStep > index + 1 || isComplete ? (
                                    <span>✓</span>
                                ) : (
                                    index + 1
                                )}
                            </p>
                        </div>
                    )}

                    <p
                        className={cn(
                            "step__name text-muted-foreground absolute left-1/2 top-12 w-max -translate-x-1/2 text-[15px]",
                        )}
                    >
                        {step.name}
                    </p>
                </div>
            ))}

            {/* Progress Bar */}
            <StepperProgressBar
                margins={margins}
                currentStep={currentStep}
                stepsLength={steps.length}
            />
        </div>
    );
};

interface StepperProgressBar {
    margins: IMargins;
    currentStep: number;
    stepsLength: number;
}

const StepperProgressBar: FC<StepperProgressBar> = ({
    margins,
    currentStep,
    stepsLength,
}): JSX.Element => {
    const calculateProgressBar = () => {
        if (stepsLength <= 1) return 0;
        return ((currentStep - 1) / (stepsLength - 1)) * 100;
    };

    return (
        <div
            className="progress-bar bg-gray absolute left-0 top-1/2 z-10 h-1 -translate-y-1/2"
            style={{
                width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
                marginLeft: margins.marginLeft,
                marginRight: margins.marginRight,
            }}
        >
            <div
                style={{ width: `${calculateProgressBar()}%` }}
                className="progress-bar__bar bg-primary h-full transition-all duration-300 ease-out"
            />
        </div>
    );
};

export { Stepper };
