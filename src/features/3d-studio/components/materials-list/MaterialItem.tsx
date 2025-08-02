import { FC } from "react";
import { cn } from "@/lib/utils";
import { I3DMaterial } from "@/types";

type MaterialItemProps = Pick<I3DMaterial, "name" | "color"> & {
    isActive: boolean;
    selectMaterial: (material: I3DMaterial) => void;
};

const MaterialItem: FC<MaterialItemProps> = ({
    isActive,
    name,
    color,
    selectMaterial,
}): JSX.Element => {
    return (
        <article
            className={cn(
                "material-item bg-gray w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-6 transition-transform duration-150 hover:scale-110",
                isActive && "border-foreground scale-105 border-2",
            )}
            style={{ borderTop: `6px solid #${color}` }}
            onClick={() => selectMaterial({ name, color: `#${color}` })}
        >
            <div className="material-item__name mx-auto">
                <p className="text-center text-[13.5px] leading-tight">{`Material_${name.slice(0, 7)}`}</p>
            </div>
        </article>
    );
};

export default MaterialItem;
