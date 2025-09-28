"use client";

import React, { FC } from "react";
import StudioViewCanvas from "@/components/3d-models/product/studio/viewCanvas";
import { IGLTFModel } from "@/types";
import StudioTopBar from "./top-bar/TopBar";
import { useStudio } from "../store/studio";
import dynamic from "next/dynamic";
import MaterialConfigurator from "./material-configurator/MaterialConfigurator";
import { convertHtmlToImage } from "@/lib/htmlIntoImage";
import { useStepper } from "@/store/stepper";
import { toast } from "react-toastify";

const MaterialsList = dynamic(() => import("./materials-list/MaterialsList"), {
    ssr: false,
});

// const MaterialConfigurator = dynamic(() => import("./MaterialConfigurator"), {
//     ssr: false,
// });

type StudioProps = {
    model: IGLTFModel;
    onSave?: () => void;
} & React.ComponentProps<"div">;

const Studio: FC<StudioProps> = ({ model, onSave, ...props }): JSX.Element => {
    const {
        arrayBuffer,
        materialToCustomize,
        canvasRef,
        selectedMaterials,
        setMaterialToCustomize,
        exportModelIntoBuffer,
    } = useStudio();
    const { setFormData } = useStepper();

    const handleSave = () => {
        exportModelIntoBuffer();

        if (!arrayBuffer) {
            toast.error("Impossible de sauvegarder le model 3D !!!");
        }

        setFormData({ key: "model", value: arrayBuffer as ArrayBuffer });
        onSave?.();
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
                    selectedMaterial={materialToCustomize}
                    updateMaterial={setMaterialToCustomize}
                />
            )}
        </div>
    );
};

export default Studio;
