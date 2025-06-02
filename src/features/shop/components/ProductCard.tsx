import ProductViewCanvas from "@/components/3d-models/product/ViewCanvas";
import { Button } from "@/components/ui/button";
import { formatIntoPrice } from "@/lib/utils";
import { IProduct } from "@/models/Product.model";
import { Info } from "lucide-react";
import { FC } from "react";

interface ProductCardProps extends Partial<IProduct> { }

const ProductCard: FC<ProductCardProps> = ({ id, name, modelPath, price, groundColor }): JSX.Element => {
    return (
        <article className="product-card relative cursor-pointer rounded-lg h-[260px] overflow-hidden" style={{ backgroundColor: `${groundColor}` }}>
            <ProductViewCanvas />

            <div className="product-card__active absolute top-0 z-40 w-full h-full flex items-center justify-center">
                <div className="overlay-bg bg-[#0D0D0D]/81 absolute w-full h-full"></div>
                <div className="content flex flex-col space-y-3 relative z-20 items-center text-center">
                    <h5 className="text-xl font-michroma">{name}</h5>
                    <p className="text-lg">{formatIntoPrice(price!)} Euros</p>
                    <Button className="rounded-full !h-8 mt-1"><Info /> Détails</Button>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;