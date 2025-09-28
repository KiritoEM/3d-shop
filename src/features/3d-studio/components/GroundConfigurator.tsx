import { RECOMMANDED_COLORS } from "@/data/studio-data";
import { cn } from "@/lib/utils";
import { IColorEntity } from "@/types";
import { FC } from "react";

type GroundConfiguratorProps = {
    colorData: IColorEntity[];
    selectedColor: string;
    onSelectColor: (color: string) => void;
};

const GroundConfigurator: FC<GroundConfiguratorProps> = ({
    colorData,
    selectedColor,
    onSelectColor,
}): JSX.Element => {
    return (
        <div className="ground-configurator absolute bottom-5 right-5 z-30 flex items-center gap-3">
            {colorData.map((color) => {
                const isSelected = color.color === selectedColor;

                return (
                    <article
                        key={color.color}
                        className={cn(
                            "h-4.5 w-4.5 rounded-full",
                            isSelected
                                ? "border-3 border-white"
                                : "cursor-pointer",
                        )}
                        style={{
                            backgroundColor: `${color.color}`,
                        }}
                        title={color.label}
                        onClick={() => onSelectColor(color.color)}
                    />
                );
            })}
        </div>
    );
};

export default GroundConfigurator;
