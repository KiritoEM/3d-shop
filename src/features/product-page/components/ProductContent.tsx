"use client";

import { useQuery } from "@tanstack/react-query";
import React, { FC, Fragment } from "react";
import { fetchProductByCuid } from "../services/productDetailsServices";
import ProductDetails from "./ProductDetails";
import { useProductCustomiser } from "../hooks/useProductCustomiser";
import { Skeleton } from "@/components/ui/skeleton";
import ProductViewCanvas from "@/components/3d-models/product/ViewCanvas";

type ProductContentProps = {
    cuid: string;
};

const ProductContent: FC<ProductContentProps> = ({ cuid }): JSX.Element => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["product", cuid],
        queryFn: () => fetchProductByCuid(cuid),
        enabled: !!cuid,
    });
    const { color, setColor, resetToDefault } = useProductCustomiser();
    let selectedMaterial: Record<string, string> = {};

    if (
        data?.customisationConfigs &&
        Object.keys(data.customisationConfigs).length > 0
    ) {
        selectedMaterial =
            data?.customisationConfigs.colorCustomisation.find(
                (opt) => opt.color === color.variant,
            )?.materials ?? {};
    }

    return (
        <div className="product-content mb-12 mt-10 flex flex-col items-center gap-14 md:gap-20 lg:flex-row">
            {!error ? (
                <Fragment>
                    <div
                        className="product-content__3d h-[68vmin] w-full overflow-hidden rounded-xl sm:h-[450px] lg:h-[70vmin] lg:w-[72vmin] xl:h-[77vmin] xl:w-[80vmin] 2xl:h-[72vmin] 2xl:w-[75vmin]"
                        style={{ backgroundColor: `${data?.groundColor}` }}
                    >
                        {!isLoading ? (
                            <ProductViewCanvas
                                config3D={data?.config3D!}
                                modelPath={data?.modelPath!}
                                orbitControl
                                selectedMaterials={selectedMaterial ?? {}}
                            />
                        ) : (
                            <Skeleton className="h-full w-full" />
                        )}
                    </div>

                    <ProductDetails
                        loadingProduct={isLoading}
                        productData={data!}
                        availableCustomisation={data?.customisationConfigs}
                        activeColor={color.variant}
                        changeModelColor={(variant: string) =>
                            setColor({ variant: variant })
                        }
                        resetModelColor={resetToDefault}
                    />
                </Fragment>
            ) : (
                error && (
                    <h4 className="col-span-3 w-full text-xl xl:text-2xl">
                        Un erreur s'est produit
                    </h4>
                )
            )}
        </div>
    );
};

export default ProductContent;
