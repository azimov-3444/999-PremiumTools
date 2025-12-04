import React from 'react';

const ProductModal = ({ product, onClose, onAddToCart, onToggleFavourite, isFavourite }) => {
    if (!product) return null;

    // Rating yulduzchalarini ko'rsatish
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <svg key={i} className="w-5 h-5 text-yellow-400" viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id="half">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="transparent" />
                            </linearGradient>
                        </defs>
                        <path fill="url(#half)" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                );
            } else {
                stars.push(
                    <svg key={i} className="w-5 h-5 text-gray-300" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                );
            }
        }
        return stars;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition z-10"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8">
                    {/* Product Image */}
                    <div className="relative">
                        {product.featured && (
                            <div className="absolute top-4 left-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-sm font-bold z-10">
                                ⭐ Tavsiya
                            </div>
                        )}
                        <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            ) : (
                                <div className="text-gray-400 text-center">
                                    <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p>Rasm yo'q</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                            {product.name}
                        </h2>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex gap-1">
                                {renderStars(product.rating)}
                            </div>
                            <span className="text-gray-600 font-semibold">{product.rating}</span>
                            <span className="text-gray-400">({product.reviewCount} sharh)</span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">Tavsif</h3>
                            <p className="text-gray-600 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Specifications */}
                        <div className="mb-6 bg-gray-50 rounded-lg p-4">
                            <h3 className="font-semibold text-lg text-gray-800 mb-3">Xususiyatlar</h3>
                            <div className="space-y-2 text-sm">
                                {product.brand && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Brend:</span>
                                        <span className="font-semibold text-gray-800">{product.brand}</span>
                                    </div>
                                )}
                                {product.material && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Material:</span>
                                        <span className="font-semibold text-gray-800">{product.material}</span>
                                    </div>
                                )}
                                {product.size && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">O'lchami:</span>
                                        <span className="font-semibold text-gray-800">{product.size}</span>
                                    </div>
                                )}
                                {product.metal && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Mos keladi:</span>
                                        <span className="font-semibold text-gray-800">{product.metal}</span>
                                    </div>
                                )}
                                {product.warranty && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Kafolat:</span>
                                        <span className="font-semibold text-green-600">{product.warranty}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-auto">
                            <button
                                onClick={() => {
                                    onAddToCart(product);
                                    onClose();
                                }}
                                disabled={!product.inStock}
                                className={`flex-1 py-4 rounded-lg font-semibold text-lg transition ${product.inStock
                                    ? 'bg-primary text-white hover:bg-red-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {product.inStock ? 'Savatchaga qo\'shish' : 'Vaqtincha tugagan'}
                            </button>
                            <button
                                onClick={() => onToggleFavourite(product.id)}
                                className={`p-4 rounded-lg border-2 transition ${isFavourite
                                    ? 'border-primary bg-primary text-white'
                                    : 'border-gray-300 text-gray-400 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                <svg className="w-7 h-7" fill={isFavourite ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
