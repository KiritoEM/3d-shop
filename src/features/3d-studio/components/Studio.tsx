import StudioViewCanvas from "@/components/3d-models/product/canvas/StudioViewCanvas";
import React, { FC } from "react";

type StudioProps = { model: Record<string, any> } & React.ComponentProps<"div">;

const Studio: FC<StudioProps> = ({ model, ...props }): JSX.Element => {
    return (
        <div className="3d-studio h-[90vh] w-full" {...props}>
            <StudioViewCanvas model={model} />
        </div>
    );
};

export default Studio;
