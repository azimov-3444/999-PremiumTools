import React, { useState } from 'react';
import ProductModal from './ProductModal';

const ProductCard = ({ product, onAddToCart, onToggleFavourite, isFavourite }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Rating yulduzchalarini ko'rsatish
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id={`half-${product.id}`}>
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                        <path fill={`url(#half-${product.id})`} d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} className="w-4 h-4 text-gray-300" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                );
            }
        }
        return stars;
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                {/* Featured Badge */}
                {product.featured && (
                    <div className="absolute top-2 left-2 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-bold z-10">
                        ⭐ Tavsiya
                    </div>
                )}

                {/* Product Image - Clickable */}
                <div
                    className="bg-gray-100 h-48 flex items-center justify-center relative cursor-pointer hover:opacity-90 transition"
                    onClick={() => setShowModal(true)}
                >
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="text-gray-400 text-center">
                            <svg className="w-20 h-20 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-sm">Rasm yo'q</p>
                        </div>
                    )}

                    {/* Quick View overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition flex items-center justify-center">
                        <span className="text-white opacity-0 hover:opacity-100 transition font-semibold text-sm bg-black bg-opacity-50 px-4 py-2 rounded-lg">
                            Ko'proq ma'lumot
                        </span>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                    {/* Title - Clickable */}
                    <h3
                        className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2 min-h-[56px] cursor-pointer hover:text-primary transition"
                        onClick={() => setShowModal(true)}
                    >
                        {product.name}
                    </h3>

                    {/* Rating */}
                    {product.rating && (
                        <div className="flex items-center gap-2 mb-2">
                            <div className="flex gap-0.5">
                                {renderStars(product.rating)}
                            </div>
                            <span className="text-sm text-gray-600">
                                {product.rating} ({product.reviewCount})
                            </span>
                        </div>
                    )}

                    {/* Brand */}
                    {product.brand && (
                        <p className="text-sm text-gray-500 mb-2">
                            <span className="font-medium">Brend:</span> {product.brand}
                        </p>
                    )}

                    {/* Stock Status */}
                    {!product.inStock && (
                        <p className="text-sm text-red-500 font-semibold mb-2">
                            ❌ Vaqtincha tugagan
                        </p>
                    )}

                    <p className="text-2xl font-bold text-primary mb-3">
                        {product.price.toLocaleString()} so'm
                    </p>

                    {/* Quick Details */}
                    {!showDetails && product.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.description}
                        </p>
                    )}

                    {/* Detailed Information */}
                    {showDetails && (
                        <div className="space-y-2 mb-3 text-sm">
                            {product.description && (
                                <p className="text-gray-600">{product.description}</p>
                            )}
                            {product.material && (
                                <p className="text-gray-700">
                                    <span className="font-semibold">Material:</span> {product.material}
                                </p>
                            )}
                            {product.size && (
                                <p className="text-gray-700">
                                    <span className="font-semibold">O'lchami:</span> {product.size}
                                </p>
                            )}
                            {product.metal && (
                                <p className="text-gray-700">
                                    <span className="font-semibold">Mos keladi:</span> {product.metal}
                                </p>
                            )}
                            {product.warranty && (
                                <p className="text-green-600">
                                    <span className="font-semibold">Kafolat:</span> {product.warranty}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Toggle Details Button */}
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className="text-primary text-sm hover:underline mb-3"
                    >
                        {showDetails ? '▲ Yashirish' : '▼ Batafsil'}
                    </button>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => onAddToCart(product)}
                            disabled={!product.inStock}
                            className={`flex-1 py-2 px-4 rounded-lg transition font-medium ${product.inStock
                                    ? 'bg-primary text-white hover:bg-red-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {product.inStock ? 'Savatchaga' : 'Tugagan'}
                        </button>
                        <button
                            onClick={() => onToggleFavourite(product.id)}
                            className={`p-2 rounded-lg border-2 transition ${isFavourite
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-gray-300 text-gray-400 hover:border-primary hover:text-primary'
                                }`}
                        >
                            <svg className="w-6 h-6" fill={isFavourite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Modal */}
            {showModal && (
                <ProductModal
                    product={product}
                    onClose={() => setShowModal(false)}
                    onAddToCart={onAddToCart}
                    onToggleFavourite={onToggleFavourite}
                    isFavourite={isFavourite}
                />
            )}
        </>
    );
};

export default ProductCard;
