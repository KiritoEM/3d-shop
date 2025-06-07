"use client"

import ProductViewCanvas from "@/components/3d-models/product/ViewCanvas";
import { Button } from "@/components/ui/button";
import useShopStore from "@/features/shop/hooks/shop/shopStore";
import { formatIntoPrice } from "@/lib/utils";
import { IProduct } from "@/models/productModel";
import { Info } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ProductCardProps extends Pick<IProduct, "cuid" | "name" | "config3D" | "modelPath" | "groundColor" | "price"> { }

const ProductCard: FC<ProductCardProps> = ({ cuid, name, modelPath, price, groundColor, config3D }): JSX.Element => {
    const { setRotateModel } = useShopStore();
    return (
        <article
            className="product-card relative cursor-pointer rounded-lg h-[270px] sm2:h-[180px] sm:h-[184px] md:h-[220px] lg:h-[200px] xl:h-[260px] 2xl:h-[235px] overflow-hidden"
            style={{ backgroundColor: `${groundColor}` }}
            onMouseEnter={setRotateModel}
        >
            <ProductViewCanvas config3D={config3D!} modelPath={modelPath} />

            <div className="product-card__active absolute top-0 z-30 w-full h-full flex items-center justify-center p-2">
                <div className="overlay-bg bg-[#0D0D0D]/81 absolute w-full h-full"></div>
                <div className="content flex flex-col space-y-3 relative z-20 items-center text-center text-white">
                    <h5 className="text-xl sm2:text-[17px] md:text-lg xl:text-xl font-michroma">{name}</h5>
                    <p className="text-lg sm2:text-sm md:text-lg">{formatIntoPrice(price!)} €</p>

                    <Button className="rounded-full !h-8 mt-1" asChild>
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