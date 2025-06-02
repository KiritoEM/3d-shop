import ProductViewCanvas from "@/components/3d-models/product/ViewCanvas";
import { IProduct } from "@/models/Product.model";
import { FC } from "react";

interface ProductCardProps extends Partial<IProduct> { }

const ProductCard: FC<ProductCardProps> = ({ id, name, modelPath, price, groundColor }): JSX.Element => {
    return (
        <article className="product-card relative rounded-lg h-[280px]" style={{ backgroundColor: `${groundColor}` }}>
            <ProductViewCanvas />
        </article>
    );
};

export default ProductCard;