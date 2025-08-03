import React, { FC, useEffect, useMemo, useState } from "react";
import { PipetteIcon } from "lucide-react";
import { RECOMMANDED_COLORS } from "@/data/studio-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { I3DMaterial, IColorEntity } from "@/types";
import ConfigBlock from "./ConfigBlock";
import PickColor from "./PickColor";

type MaterialConfiguratorProps = {
    selectedMaterial: I3DMaterial;
    updateMaterial: (material: I3DMaterial) => void;
};

const MaterialConfigurator: FC<MaterialConfiguratorProps> = ({
    selectedMaterial,
    updateMaterial,
}): JSX.Element => {
    const [pickColor, setPickColor] = useState<boolean>(false);
    const defaultColor = useMemo(() => {
        return selectedMaterial.color;
    }, [selectedMaterial.color]);

    //default color by default
    useEffect(() => {
        if (!selectedMaterial.updatedColor) {
            updateMaterial({
                ...selectedMaterial,
                updatedColor: defaultColor as string,
            });
        }
    }, []);

    const currentColor = useMemo(() => {
        return selectedMaterial.updatedColor;
    }, [selectedMaterial.updatedColor]);

    const defaultColorObject: IColorEntity = {
        label: "Couleur par defaut",
        color: selectedMaterial.color as string,
        default: true,
    };

    const handleChangeColor = (newColor: string) => {
        console.log(newColor);
        if (newColor !== currentColor) {
            updateMaterial({
                ...selectedMaterial,
                updatedColor: newColor,
            });
        }
    };

    const avalaibleColors: IColorEntity[] = [
        defaultColorObject,
        ...RECOMMANDED_COLORS.filter((item) => item.color !== defaultColor),
    ];
    return (
        <div className="material-configurator bg-gray absolute right-4 top-20 z-30 w-full max-w-[244px] rounded-lg p-4">
            <ConfigBlock name="color" title="Couleurs">
                <div className="colors-list flex flex-wrap gap-4 gap-y-3">
                    {avalaibleColors.map((item, index) => {
                        const isSelected = item.color === currentColor;
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

                    {/* Pick Color */}
                    <div className="pick-color">
                        <Button
                            size="sm"
                            className="!h-7 w-7 !px-0 !py-0"
                            variant="outline"
                            onClick={() => setPickColor(!pickColor)}
                        >
                            <PipetteIcon className="!size-4" />
                        </Button>
                    </div>

                    <PickColor
                        isOpen={pickColor}
                        onColorChange={handleChangeColor}
                    />
                </div>
            </ConfigBlock>
        </div>
    );
};

export default MaterialConfigurator;
