"use client";

import React, { FC } from "react";
import StudioViewCanvas from "@/components/3d-models/product/studio/viewCanvas";
import { IGLTFModel } from "@/types";
import StudioTopBar from "./top-bar/TopBar";
import { useStudio } from "../store/studio";
import dynamic from "next/dynamic";
import MaterialConfigurator from "./material-configurator/MaterialConfigurator";
import { convertHtmlToImage } from "@/lib/htmlIntoImage";

const MaterialsList = dynamic(() => import("./materials-list/MaterialsList"), {
    ssr: false,
});

// const MaterialConfigurator = dynamic(() => import("./MaterialConfigurator"), {
//     ssr: false,
// });

type StudioProps = { model: IGLTFModel } & React.ComponentProps<"div">;

const Studio: FC<StudioProps> = ({ model, ...props }): JSX.Element => {
    const {
        materialToCustomize,
        canvasRef,
        selectedMaterials,
        setMaterialToCustomize,
    } = useStudio();
    return (
        <div className="3d-studio relative h-[94vh] w-full" {...props}>
            <StudioViewCanvas model={model} />

            {/* Top Bar */}
            <StudioTopBar
                onCapture={() => {
                    canvasRef?.current
                        ? convertHtmlToImage(canvasRef)
                        : undefined;
                }}
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
