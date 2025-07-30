import React, { FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LucideIcon } from "lucide-react";

type MaterialItemProps = {
    name: string;
    Icon: LucideIcon;
    description: string;
};

const MaterialItem: FC<MaterialItemProps> = ({
    name,
    description,
    Icon,
}): JSX.Element => {
    return (
        <article className="material-item bg-gray flex aspect-auto w-full flex-col items-center gap-3 rounded-lg p-4">
            <div className="material-item__representation-icon">
                {/* <Icon className="size-7" /> */}
            </div>

            <div className="material-item__name mx-auto" title={description}>
                <p className="text-center text-[13px] leading-tight">{`${name.charAt(0).toUpperCase()}${name.slice(1)}`}</p>
            </div>
        </article>
    );
};

type MaterialsListProps = {
    materials: MaterialItemProps[];
};

const MaterialsConfigurator: FC<MaterialsListProps> = ({
    materials,
}): JSX.Element => {
    return (
        <div className="materials-wrapper scrollable-section absolute bottom-2 right-8 z-30 h-[86%] w-[124px] overflow-y-auto px-2">
            <div className="materials-list flex h-fit flex-col gap-5">
                {materials.map((material, index) => (
                    <MaterialItem key={index} {...material} />
                ))}
            </div>
        </div>
    );
};

export default MaterialsConfigurator;
