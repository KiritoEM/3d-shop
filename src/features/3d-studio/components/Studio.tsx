"use client";

import React, { FC } from "react";
import StudioViewCanvas from "@/components/3d-models/product/studio/viewCanvas";
import { IGLTFModel } from "@/types";
import StudioTopBar from "./top-bar/TopBar";
import { useStudio } from "../store/studio";
import dynamic from "next/dynamic";
import MaterialConfigurator from "./material-configurator/MaterialConfigurator";
import { convertHtmlToImage } from "@/lib/htmlIntoImage";
import { toast } from "react-toastify";
import GroundConfigurator from "./GroundConfigurator";
import {
    AVAILABLE_GROUND_COLORS,
    RECOMMANDED_COLORS,
} from "@/data/studio-data";

const MaterialsList = dynamic(() => import("./materials-list/MaterialsList"), {
    ssr: false,
});

type StudioProps = {
    model: IGLTFModel;
    isSaving?: boolean;
    onSave: (arrayBuffer: ArrayBuffer) => void;
} & React.ComponentProps<"div">;

const Studio: FC<StudioProps> = ({
    model,
    isSaving,
    onSave,
    ...props
}): JSX.Element => {
    const {
        arrayBuffer,
        materialToCustomize,
        canvasRef,
        groundColor,
        selectedMaterials,
        setMaterialToCustomize,
        exportModelIntoBuffer,
        setGroundColor,
    } = useStudio();

    const handleSave = () => {
        exportModelIntoBuffer();

        if (!arrayBuffer) {
            toast.error("Impossible de sauvegarder le model 3D !!!");
            return;
        }

        onSave?.(arrayBuffer);
    };

    return (
        <div className="studio relative h-[94vh] w-full" {...props}>
            <StudioViewCanvas model={model} />

            {/* Top Bar */}
            <StudioTopBar
                onCapture={() => {
                    canvasRef?.current
                        ? convertHtmlToImage(canvasRef)
                        : undefined;
                }}
                onSave={handleSave}
            />

            {/* Bottom toolbar */}
            {selectedMaterials.length && (
                <MaterialsList selectedMaterials={selectedMaterials} />
            )}

            {/* Right Configurator */}
            {materialToCustomize && selectedMaterials.length > 0 && (
                <MaterialConfigurator
                    colorsData={RECOMMANDED_COLORS}
                    selectedMaterial={materialToCustomize}
                    updateMaterial={setMaterialToCustomize}
                />
            )}

            {/* Ground Configurator */}
            <GroundConfigurator
                colorData={AVAILABLE_GROUND_COLORS}
                selectedColor={groundColor}
                onSelectColor={setGroundColor}
            />

            {/* Loading when saving */}
            {isSaving && (
                <div className="loading-spinner absolute inset-0 z-50 flex flex-1 items-center justify-center bg-black/75">
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-7 w-7 animate-spin rounded-full border-b-2 border-current" />
                        <span>Création en cours...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Studio;
