"use client";

import React, { FC } from "react";

import { I3DMaterial } from "@/types";
import { useStudio } from "../../store/studio";
import MaterialItem from "./MaterialItem";

type MaterialsListProps = {
    selectedMaterials: I3DMaterial[];
};

const MaterialsList: FC<MaterialsListProps> = ({
    selectedMaterials,
}): JSX.Element | null => {
    if (selectedMaterials.length === 0) {
        return null;
    }

    const { materialToCustomize, setMaterialToCustomize } = useStudio();

    return (
        <div className="materials-wrapper scrollable-section absolute bottom-4 left-1/2 z-30 -translate-x-1/2 overflow-x-auto overflow-y-hidden px-2 py-3">
            <div className="materials-list flex gap-5">
                {(selectedMaterials as I3DMaterial[]).map((material, index) => (
                    <MaterialItem
                        key={index}
                        isActive={materialToCustomize?.name === material.name}
                        name={material.name}
                        color={material.updatedColor ?? material.color}
                        selectMaterial={setMaterialToCustomize}
                    />
                ))}
            </div>
        </div>
    );
};

export default MaterialsList;
