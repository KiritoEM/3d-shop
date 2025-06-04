"use client"

import ProductViewCanvas from "@/components/3d-models/product/ViewCanvas";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import React, { FC, Fragment } from "react";
import { fetchProductByCuid } from "../services/productDetailsServices";
import { Button } from "@/components/ui/button";
import { formatIntoPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

type ProductContentProps = {
    cuid: string
}

const ProductContent: FC<ProductContentProps> = ({ cuid }): JSX.Element => {
    const { data, isLoading } = useQuery({
        queryKey: ["product", cuid],
        queryFn: () => fetchProductByCuid(cuid),
        enabled: !!cuid
    })

    return (
        <div className="product-content mt-10 mb-12 flex gap-20">
            <div className="product-content__3d h-[77vmin] w-[80vmin] rounded-xl overflow-hidden" style={{ backgroundColor: `${data?.groundColor}` }}>
                {
                    !isLoading ?
                        (
                            <ProductViewCanvas config3D={data?.config3D!} modelPath={data?.modelPath!} />
                        ) : (
                            <Skeleton className="w-full h-full" />
                        )
                }
            </div>

            <div className="product-details flex-1 space-y-6">
                {
                    !isLoading ? (
                        <Fragment>
                            <div className="product-details__tag rounded-xl px-4 py-2 bg-primary/10 text-primary w-fit">
                                <p>{data?.category?.name || 'Unknown Category'}</p>
                            </div>

                            <h2 className="product-details__title text-5xl font-michroma">{data?.name || 'Unknown Category'}</h2>

                            <p className="product-details__description text-foreground/80">{data?.description}</p>

                            <div className="product-details__price flex justify-between items-center mt-2">
                                <h4 className="text-4xl">{formatIntoPrice(data?.price!)} €</h4>

                                <Button className="rounded-full"><ShoppingCart /> Ajouter au panier</Button>
                            </div>
                        </Fragment>
                    ) : (
                        //Loading product
                        <Fragment>
                            <Fragment>
                                <Skeleton className="tag-skeleton rounded-full w-[20%] h-[22px]" />
                                <Skeleton className="title-skeleton rounded-full w-[60%] h-[35px]" />
                                <Skeleton className="description-skeleton rounded-lg w-[90%] h-[115px]" />

                                <div className="product-details__price flex justify-between items-center mt-2">
                                    <Skeleton className="price rounded-full w-[45%] h-[35px]" />

                                    <Skeleton className="price rounded-full w-[34%] h-[30px]" />
                                </div>
                            </Fragment>
                        </Fragment>
                    )
                }
            </div >
        </div >
    );
};

export default ProductContent;