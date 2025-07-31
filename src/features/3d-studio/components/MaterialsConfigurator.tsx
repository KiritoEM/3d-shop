"use client";

import React, { FC } from "react";

import { I3DMaterial } from "@/types";

type MaterialItemProps = Pick<I3DMaterial, "name" | "color"> & {};

const MaterialItem: FC<MaterialItemProps> = ({ name, color }): JSX.Element => {
    return (
        <article
            className="material-item bg-gray w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-6 transition-transform duration-150 hover:scale-110"
            style={{ borderTop: `6.5px solid #${color}` }}
        >
            <div className="material-item__name mx-auto">
                <p className="text-center text-[13.5px] leading-tight">{`Material_${name.slice(0, 7)}`}</p>
            </div>
        </article>
    );
};

type MaterialsListProps = {
    selectedMaterials: I3DMaterial[];
};

const MaterialsConfigurator: FC<MaterialsListProps> = ({
    selectedMaterials,
}): JSX.Element | null => {
    console.log(selectedMaterials);
    if (selectedMaterials.length === 0) {
        return null;
    }

    return (
        <div className="materials-wrapper scrollable-section absolute bottom-4 left-1/2 z-30 -translate-x-1/2 overflow-x-auto overflow-y-hidden px-2 py-3">
            <div className="materials-list flex gap-5">
                {(selectedMaterials as I3DMaterial[]).map((material, index) => (
                    <MaterialItem
                        key={index}
                        name={material.name}
                        color={material.color}
                    />
                ))}
            </div>
        </div>
    );
};

export default MaterialsConfigurator;
