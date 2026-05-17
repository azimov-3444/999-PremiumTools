import React from 'react';
import ProductCard from './ProductCard';
import { useLanguage } from '../i18n/LanguageContext';

const DiscountsSection = ({ products, onToggleFavourite, favourites }) => {
    const { t } = useLanguage();
    // Chegirmadagi mahsulotlarni filtrlash
    const discountedProducts = products.filter(product => product.discount > 0);

    if (discountedProducts.length === 0) {
        return null; // Chegirma yo'q bo'lsa, bo'limni ko'rsatmaymiz
    }

    return (
        <section className="container mx-auto px-4 py-6 md:py-12">
            <div className="flex items-center justify-between mb-4 md:mb-8">
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-1 h-6 md:h-8 bg-green-500 rounded-full"></div>
                    <h2 className="text-xl md:text-3xl font-bold text-gray-800">
                        {t.home.discounts}
                    </h2>
                </div>
                <div className="text-sm md:text-base text-green-600 font-semibold">
                    {discountedProducts.length} {t.catalog.productsFound}
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {discountedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onToggleFavourite={onToggleFavourite}
                        isFavourite={favourites.includes(product.id)}
                    />
                ))}
            </div>
        </section>
    );
};

export default DiscountsSection;
