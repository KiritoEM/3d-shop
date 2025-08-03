import React, { FC } from "react";
import { RECOMMANDED_COLORS } from "@/data/studio-data";
import { cn } from "@/lib/utils";
import { I3DMaterial, IColorEntity } from "@/types";
import ConfigBlock from "./ConfigBlock";

type MaterialConfiguratorProps = {
    selectedMaterial: I3DMaterial;
    updateMaterial: (material: I3DMaterial) => void;
};

const MaterialConfigurator: FC<MaterialConfiguratorProps> = ({
    selectedMaterial,
    updateMaterial,
}): JSX.Element => {
    const getCurrentColor = () => {
        return selectedMaterial.updatedColor ?? selectedMaterial.color;
    };

    const defaultMaterialColor: IColorEntity = {
        label: "Couleur par defaut",
        color: selectedMaterial.color as string,
        default: true,
    };

    const handleChangeColor = (newColor: string) => {
        if (newColor !== getCurrentColor()) {
            updateMaterial({
                ...selectedMaterial,
                updatedColor: newColor,
            });
        }
    };

    const avalaibleColors = [
        defaultMaterialColor,
        ...RECOMMANDED_COLORS.filter(
            (item) => item.color !== defaultMaterialColor.color,
        ),
    ];
    return (
        <div className="material-configurator bg-gray absolute right-4 top-20 z-30 w-full max-w-[244px] rounded-lg p-4">
            <ConfigBlock name="color" title="Couleurs">
                <div className="colors-list flex flex-wrap gap-4 gap-y-3">
                    {avalaibleColors.map((item, index) => {
                        const isSelected = item.color === getCurrentColor();
                        return (
                            <article
                                key={index}
                                className={cn(
                                    "h-7 w-7 rounded-md",
                                    isSelected
                                        ? "border-3 border-yellow-400"
                                        : "cursor-pointer",
                                )}
                                style={{ backgroundColor: `${item.color}` }}
                                title={item.label}
                                onClick={() => handleChangeColor(item.color)}
                            />
                        );
                    })}
                </div>
            </ConfigBlock>
        </div>
    );
};

export default MaterialConfigurator;
