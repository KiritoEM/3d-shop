"use client";

import { FC } from "react";
import {
    ColorPicker,
    ColorPickerAlpha,
    ColorPickerEyeDropper,
    ColorPickerFormat,
    ColorPickerHue,
    ColorPickerOutput,
    ColorPickerSelection,
} from "@/components/ui/shadcn-io/color-picker";

type PickColorProps = {
    onColorChange?: (color: string) => void;
};

const PickColor: FC<PickColorProps> = ({
    onColorChange,
}): JSX.Element => {
    return (
        <ColorPicker
            className="bg-background mt-1 max-w-sm rounded-md border p-4 shadow-sm"
            onColorChange={onColorChange}
        >
            <ColorPickerSelection className="!h-34" />

            <div className="flex items-center gap-4">
                <ColorPickerEyeDropper />
                <div className="grid w-full gap-1">
                    <ColorPickerHue />
                    <ColorPickerAlpha />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <ColorPickerOutput hidden />
                <ColorPickerFormat />
            </div>
        </ColorPicker>
    );
};

export default PickColor;
