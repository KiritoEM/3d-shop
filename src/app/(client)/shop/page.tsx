import FilterSidebar from '@/features/shop/components/Filter-sidebar';
import ProductCard from '@/features/shop/components/ProductCard';
import React from 'react';

const Shop = (): JSX.Element => {
    return (
        <section className="shop container !px-6 flex gap-12 mt-[106px]">
            <FilterSidebar />

            <div className="shop-products w-[calc(100%-380px)] ml-[380px]">
                <header className="shop-products__header">
                    <h2 className='font-michroma text-4xl'>Notre Shop</h2>
                </header>

                <div className="shop-products__showcases grid grid-cols-3 mt-12 gap-x-6 gap-y-8">
                    <ProductCard id={1} name="Iphone 12 Pro" description="Découvrez l'iPhone 16 Pro et laissez-vous séduire par une technologie qui redéfinit les standards. Conçu pour ceux qui exigent le meilleur, ce smartphone premium vous offre une expérience utilisateur incomparable." modelPath="" price={150000} groundColor="#585656" />
                </div>
            </div>
        </section>
    );
};

export default Shop;