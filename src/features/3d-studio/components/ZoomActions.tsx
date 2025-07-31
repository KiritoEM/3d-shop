"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStudio } from "../hooks/useStudio";

const BUTTON_BASE_STYLE = `!h-fit cursor-pointer !px-2 !py-2 hover:[&>svg]:scale-115 transition-all`;

const ZoomActions = (): JSX.Element => {
    const { setCameraAction } = useStudio();
    return (
        <div className="zoom-actions flex flex-col gap-3">
            <Button
                className={BUTTON_BASE_STYLE}
                size="sm"
                onClick={() => setCameraAction("ZOOM_OUT")}
            >
                <Minus className="size-4" />
            </Button>

            <Button
                className={BUTTON_BASE_STYLE}
                size="sm"
                onClick={() => setCameraAction("ZOOM_IN")}
            >
                <Plus className="size-4" />
            </Button>
        </div>
    );
};

export default ZoomActions;
