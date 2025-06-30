"use client";

import ProductViewCanvas from "@/components/3d-models/product/ViewCanvas";
import { Button } from "@/components/ui/button";
import useShopStore from "@/features/shop/hooks/shop/shopStore";
import { formatIntoPrice } from "@/lib/utils";
import { IProduct } from "@/models/productModel";
import { Info } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ProductCardProps
    extends Pick<
        IProduct,
        "cuid" | "name" | "config3D" | "modelPath" | "groundColor" | "price"
    > {}

const ProductCard: FC<ProductCardProps> = ({
    cuid,
    name,
    modelPath,
    price,
    groundColor,
    config3D,
}): JSX.Element => {
    const { setRotateModel } = useShopStore();
    return (
        <article
            className="product-card sm2:h-[180px] relative h-[270px] cursor-pointer overflow-hidden rounded-lg sm:h-[184px] md:h-[220px] lg:h-[200px] xl:h-[260px] 2xl:h-[235px]"
            style={{ backgroundColor: `${groundColor}` }}
            onMouseEnter={setRotateModel}
        >
            <ProductViewCanvas config3D={config3D!} modelPath={modelPath} />

            <div className="product-card__active absolute top-0 z-30 flex h-full w-full items-center justify-center p-2">
                <div className="overlay-bg bg-[#0D0D0D]/81 absolute h-full w-full"></div>
                <div className="content relative z-20 flex flex-col items-center space-y-3 text-center text-white">
                    <h5 className="sm2:text-[17px] font-michroma text-xl md:text-lg xl:text-xl">
                        {name}
                    </h5>
                    <p className="sm2:text-sm text-lg md:text-lg">
                        {formatIntoPrice(price!)} €
                    </p>

                    <Button className="mt-1 !h-8 rounded-full" asChild>
                        <Link href={`/shop/${cuid}`}>
                            <Info /> Détails
                        </Link>
                    </Button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;
