import React from 'react';
import ProductCard from './ProductCard';

const Favourites = ({ favourites, products, onAddToCart, onToggleFavourite }) => {
    const favouriteProducts = products.filter(p => favourites.includes(p.id));

    if (favouriteProducts.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Sevimlilar</h2>
                    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                        <svg className="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <p className="text-xl text-gray-500">Sevimlilar ro'yxati bo'sh</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Sevimlilar</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favouriteProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                            onToggleFavourite={onToggleFavourite}
                            isFavourite={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Favourites;
