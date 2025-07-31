"use client";

import React, { FC } from "react";
import StudioViewCanvas from "@/components/3d-models/product/studio/StudioViewCanvas";
import { IGLTFModel } from "@/types";
import StudioTopBar from "./TopBar";
import { useStudio } from "../hooks/useStudio";
import dynamic from "next/dynamic";

const MaterialsConfigurator = dynamic(() => import("./MaterialsConfigurator"), {
    ssr: false,
});

type StudioProps = { model: IGLTFModel } & React.ComponentProps<"div">;

const Studio: FC<StudioProps> = ({ model, ...props }): JSX.Element => {
    const { selectedMaterials } = useStudio();
    return (
        <div className="3d-studio relative h-[94vh] w-full" {...props}>
            <StudioViewCanvas model={model} />

            {/* Top Bar */}
            <StudioTopBar isMaterialsSelected={selectedMaterials.length > 0} />

            {/* Bottom toolbar */}
            {selectedMaterials.length && (
                <MaterialsConfigurator selectedMaterials={selectedMaterials} />
            )}
        </div>
    );
};  

export default Studio;
