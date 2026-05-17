import React from 'react';

const Cart = ({ cart, onUpdateQuantity, onRemoveFromCart, products }) => {
    const getProduct = (productId) => products.find(p => p.id === productId);

    const total = cart.reduce((sum, item) => {
        const product = getProduct(item.productId);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    if (cart.length === 0) {
        return (
            <div className="bg-gray-50 min-h-screen py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Savatcha</h2>
                    <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 text-center">
                        <svg className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-lg md:text-xl text-gray-500">Savatchangiz bo'sh</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8 md:py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Savatcha</h2>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map(item => {
                            const product = getProduct(item.productId);
                            if (!product) return null;

                            return (
                                <div key={item.productId} className="bg-white rounded-xl shadow-lg p-3 md:p-6">
                                    <div className="flex flex-row gap-3 sm:gap-4">
                                        {/* Product Image */}
                                        <div className="bg-gray-100 w-20 h-20 sm:w-24 sm:h-24 rounded-lg flex-shrink-0 flex items-center justify-center">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                                            ) : (
                                                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-base md:text-lg text-gray-800 mb-2">{product.name}</h3>
                                            <p className="text-xl md:text-2xl font-bold text-primary mb-3">
                                                {product.price.toLocaleString()} so'm
                                            </p>

                                            {/* Controls */}
                                            <div className="flex items-center justify-between mt-2 sm:mt-0">
                                                <div className="flex items-center border border-gray-300 rounded-lg h-8 sm:h-10">
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
                                                        className="px-2 sm:px-3 h-full hover:bg-gray-100 transition text-sm sm:text-base font-bold flex items-center justify-center"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-3 sm:px-4 h-full border-x border-gray-300 font-semibold text-sm sm:text-base flex items-center justify-center min-w-[2rem]">{item.quantity}</span>
                                                    <button
                                                        onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
                                                        className="px-2 sm:px-3 h-full hover:bg-gray-100 transition text-sm sm:text-base font-bold flex items-center justify-center"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => onRemoveFromCart(item.productId)}
                                                    className="text-red-500 hover:text-red-700 transition p-2 bg-red-50 rounded-lg sm:bg-transparent"
                                                >
                                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24">
                            <h3 className="font-semibold text-lg md:text-xl text-gray-800 mb-4">Buyurtma</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-gray-600 text-base">
                                    <span>Mahsulotlar:</span>
                                    <span>{cart.reduce((sum, item) => sum + item.quantity, 0)} ta</span>
                                </div>
                                <div className="border-t pt-3 flex justify-between font-bold text-xl md:text-2xl">
                                    <span>Jami:</span>
                                    <span className="text-primary">{total.toLocaleString()} so'm</span>
                                </div>
                            </div>

                            <button className="w-full bg-primary text-white py-4 rounded-lg hover:bg-red-700 transition font-semibold text-lg">
                                Buyurtma berish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
