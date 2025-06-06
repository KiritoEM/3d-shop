import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatIntoPrice } from '@/lib/utils';
import { CustomisationConfigs, IProduct } from '@/models/product.model';
import { CheckIcon, ShoppingCart } from 'lucide-react';
import React, { FC, Fragment } from 'react';

interface ColorOptProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: string;
    isActive?: boolean
}

const ColorOpt: FC<ColorOptProps> = ({ color, isActive = false, ...props }) => {
    return (
        <div className="color__opt relative cursor-pointer overflow-hidden w-8 h-8 rounded-full border-2 border-foreground" style={{ backgroundColor: `${color}` }} {...props} >
            {isActive && <div className="active-opt absolute top-0 left-0 h-full w-full bg-white/30 flex items-center justify-center"><CheckIcon className="size-5 text-secondary" /></div>}
        </div>
    )
}

const ProductSkeletonsLoader = () => {
    return (
        <Fragment>
            <Skeleton className="tag-skeleton rounded-full w-[26%] lg:w-[20%] h-[22px]" />
            <Skeleton className="title-skeleton rounded-full w-[66%] lg:w-[60%] h-[35px]" />
            <Skeleton className="description-skeleton rounded-lg w-[100%] xl:w-[90%] h-[115px] lg:h-[125px]" />

            <div className="product-details__price flex justify-between items-center mt-2">
                <Skeleton className="price rounded-full w-[40%] lg:w-[45%] h-[31px] lg:h-[35px]" />

                <Skeleton className="price rounded-full w-[32%] lg:w-[34%] h-[30px]" />
            </div>
        </Fragment>
    )
}


type ProductDetailsProps = {
    loadingProduct: boolean;
    productData: IProduct;
    availableCustomisation?: CustomisationConfigs;
    activeColor: string;
    changeModelColor: (variant: string) => void;
    resetModelColor: () => void
}

const ProductDetails: FC<ProductDetailsProps> = ({ loadingProduct, productData, availableCustomisation = {}, activeColor, changeModelColor, resetModelColor }): JSX.Element => {
    return (
        <div className="product-details w-full lg:flex-1 space-y-6">
            {
                !loadingProduct ? (
                    <Fragment>
                        <div className="product-details__tag rounded-xl px-4 py-2 bg-primary/10 text-primary w-fit">
                            <p>{productData?.category?.name || 'Unknown Category'}</p>
                        </div>

                        <h2 className="product-details__title text-4xl xl:text-5xl font-michroma">{productData?.name || 'Unknown Category'}</h2>

                        <p className="product-details__description text-foreground/80">{productData?.description}</p>

                        <div className="product-details__price flex flex-col sm:flex-row gap-3 justify-between sm:items-center mt-2">
                            <h4 className="text-2xl xl:text-4xl">{formatIntoPrice(productData?.price!)} €</h4>

                            <Button className="rounded-full w-fit"><ShoppingCart /> Ajouter au panier</Button>
                        </div>

                        {
                            availableCustomisation && availableCustomisation.colorCustomisation && (
                                <Fragment>
                                    <hr className="mt-6" />
                                    <div className="3d-customisation mt-8">
                                        <h5 className="text-xl lg:text-2xl">Changer la couleur du modèle</h5>

                                        <div className="color mt-4 flex items-center gap-7">
                                            <ColorOpt isActive={activeColor === "default"} color={availableCustomisation.defaultColor} onClick={() => resetModelColor()} />

                                            {
                                                availableCustomisation.colorCustomisation.map((opt, index) => (
                                                    <ColorOpt key={index} isActive={opt.color === activeColor} color={opt.value} onClick={() => changeModelColor(opt.color)} />
                                                ))
                                            }
                                        </div>
                                    </div>
                                </Fragment>
                            )
                        }
                    </Fragment>
                ) : (
                    //Loading sekeletons
                    <ProductSkeletonsLoader />
                )
            }
        </div >
    );
};

export default ProductDetails;