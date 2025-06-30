import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/features/cart/hooks/useCart";
import { cn, formatIntoPrice } from "@/lib/utils";
import { CustomisationConfigs, IProduct } from "@/models/productModel";
import { CheckCheck, CheckIcon, ShoppingCart } from "lucide-react";
import React, { FC, Fragment } from "react";

interface ColorOptProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: string;
    isActive?: boolean;
}

const ColorOpt: FC<ColorOptProps> = ({ color, isActive = false, ...props }) => {
    return (
        <div
            className="color__opt border-foreground relative h-7 w-7 cursor-pointer overflow-hidden rounded-full border-2 md:h-8 md:w-8"
            style={{ backgroundColor: `${color}` }}
            {...props}
        >
            {isActive && (
                <div className="active-opt absolute left-0 top-0 flex h-full w-full items-center justify-center bg-white/30">
                    <CheckIcon className="text-secondary size-4 md:size-5" />
                </div>
            )}
        </div>
    );
};

const ProductSkeletonsLoader = () => {
    return (
        <Fragment>
            <Skeleton className="tag-skeleton h-[22px] w-[26%] rounded-full lg:w-[20%]" />
            <Skeleton className="title-skeleton h-[35px] w-[66%] rounded-full lg:w-[60%]" />
            <Skeleton className="description-skeleton h-[115px] w-[100%] rounded-lg lg:h-[125px] xl:w-[90%]" />

            <div className="product-details__price mt-2 flex items-center justify-between">
                <Skeleton className="price h-[31px] w-[40%] rounded-full lg:h-[35px] lg:w-[45%]" />

                <Skeleton className="price h-[30px] w-[32%] rounded-full lg:w-[34%]" />
            </div>
        </Fragment>
    );
};

type ProductDetailsProps = {
    loadingProduct: boolean;
    productData: IProduct;
    availableCustomisation?: CustomisationConfigs;
    activeColor: string;
    changeModelColor: (variant: string) => void;
    resetModelColor: () => void;
};

const ProductDetails: FC<ProductDetailsProps> = ({
    loadingProduct,
    productData,
    availableCustomisation = {},
    activeColor,
    changeModelColor,
    resetModelColor,
}): JSX.Element => {
    const { addItem, checkIsInCart } = useCart();

    return (
        <div className="product-details w-full space-y-6 lg:flex-1">
            {!loadingProduct ? (
                <Fragment>
                    <div className="product-details__tag bg-primary/10 text-primary w-fit rounded-xl px-4 py-2">
                        <p>
                            {productData?.category?.name || "Unknown Category"}
                        </p>
                    </div>

                    <h2 className="product-details__title font-michroma text-4xl xl:text-5xl">
                        {productData?.name || "Unknown Category"}
                    </h2>

                    <p className="product-details__description text-foreground/80">
                        {productData?.description}
                    </p>

                    <div className="product-details__price mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <h4 className="text-2xl xl:text-4xl">
                            {formatIntoPrice(productData?.price!)} €
                        </h4>

                        <Button
                            disabled={checkIsInCart(productData.id)}
                            className={cn(
                                "w-fit rounded-full",
                                checkIsInCart(productData.id) &&
                                    "pointer-events-none bg-gray-500",
                            )}
                            onClick={() =>
                                addItem({
                                    id: productData.id,
                                    name: productData.name,
                                    price: productData.price,
                                })
                            }
                        >
                            {checkIsInCart(productData.id) ? (
                                <Fragment>
                                    <CheckCheck />
                                    <span>Ajouté au panier</span>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <ShoppingCart />
                                    <span>Ajouter au panier</span>
                                </Fragment>
                            )}
                        </Button>
                    </div>

                    {availableCustomisation &&
                        availableCustomisation.colorCustomisation && (
                            <Fragment>
                                <hr className="mt-6" />
                                <div className="3d-customisation mt-8">
                                    <h5 className="text-lg md:text-xl lg:text-2xl">
                                        Changer la couleur du modèle
                                    </h5>

                                    <div className="color mt-4 flex items-center gap-7">
                                        <ColorOpt
                                            isActive={activeColor === "default"}
                                            color={
                                                availableCustomisation.defaultColor
                                            }
                                            onClick={() => resetModelColor()}
                                        />

                                        {availableCustomisation.colorCustomisation.map(
                                            (opt, index) => (
                                                <ColorOpt
                                                    key={index}
                                                    isActive={
                                                        opt.color ===
                                                        activeColor
                                                    }
                                                    color={opt.value}
                                                    onClick={() =>
                                                        changeModelColor(
                                                            opt.color,
                                                        )
                                                    }
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            </Fragment>
                        )}
                </Fragment>
            ) : (
                //Loading sekeletons
                <ProductSkeletonsLoader />
            )}
        </div>
    );
};

export default ProductDetails;
