"use client";

import React, { FC, useState } from "react";
import StudioViewCanvas from "@/components/3d-models/product/studio/StudioViewCanvas";
import { IGLTFModel } from "@/types";
import ZoomActions from "./ZoomActions";
import MaterialsConfigurator from "./MaterialsConfigurator";
import { useQuery } from "@tanstack/react-query";
import { getMaterials } from "../services/studioServices";
import Error from "@/components/error";
import { MaterialsMockData } from "@/__mock__/studio-mock";
import { transformMaterialsIntoArray } from "@/lib/model3d";

type StudioProps = { model: IGLTFModel } & React.ComponentProps<"div">;

const Studio: FC<StudioProps> = ({ model, ...props }): JSX.Element => {
    // const {
    //     data: materialsData,
    //     error: MaterialsError,
    //     isLoading,
    // } = useQuery({
    //     queryKey: ["3D_materials", model.materials],
    //     queryFn: () =>
    //         getMaterials(transformMaterialsIntoArray(model.materials)),
    // });

    // console.log(materialsData);

    // if (MaterialsError) {
    //     return <Error error="Un erreur s' est produit" />;
    // }
    return (
        <div className="3d-studio relative h-[94vh] w-full" {...props}>
            <StudioViewCanvas model={model} />

            <ZoomActions />

            {/* Right toolbar */}
            {/* {!isLoading && <MaterialsConfigurator materials={materialsData} />} */}
        </div>
    );
};

export default Studio;
