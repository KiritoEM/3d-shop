import React, { FC } from "react";
import StudioViewCanvas from "@/components/3d-models/product/canvas/StudioViewCanvas";
import { IGLTFModel } from "@/types";
import MaterialsList from "./MaterialsConfigurator";
import ZoomActions from "./ZoomActions";

type StudioProps = { model: IGLTFModel } & React.ComponentProps<"div">;

const Studio: FC<StudioProps> = ({ model, ...props }): JSX.Element => {
    return (
        <div className="3d-studio relative h-[90vh] w-full" {...props}>
            <StudioViewCanvas model={model} />

            <ZoomActions />

            {/* Right toolbar */}
            {/* <MaterialsList /> */}
        </div>
    );
};

export default Studio;
