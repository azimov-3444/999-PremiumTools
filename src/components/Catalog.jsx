import React, { useState } from 'react';
import SEO from './SEO';
import ProductCard from './ProductCard';

const Catalog = ({
    products,
    categories,
    onAddToCart,
    onToggleFavourite,
    favourites
}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [showFeatured, setShowFeatured] = useState(false);
    const [showFilters, setShowFilters] = useState(false);

    // Filter products
    const filteredProducts = products.filter(product => {
        if (selectedCategory && product.categoryId !== selectedCategory) return false;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchName = product.name.toLowerCase().includes(query);
            const matchDescription = product.description?.toLowerCase().includes(query);
            const matchMaterial = product.material?.toLowerCase().includes(query);
            if (!matchName && !matchDescription && !matchMaterial) return false;
        }
        if (priceRange.min && product.price < parseInt(priceRange.min)) return false;
        if (priceRange.max && product.price > parseInt(priceRange.max)) return false;
        if (showFeatured && !product.featured) return false;
        return true;
    });

    // Get current category name
    const currentCategory = selectedCategory
        ? categories.find(c => c.id === selectedCategory)?.name
        : null;

    return (
        <div className="bg-gray-50 py-6 md:py-12 min-h-screen">
            <SEO
                title={currentCategory ? `${currentCategory} - Katalog` : "Katalog"}
                description="999 Premium Tools mahsulotlar katalogi. Barcha turdagi zargarlik uskunalari va asboblari."
            />
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Katalog</h2>

                {/* Search Bar */}
                <div className="mb-4 md:mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Qidirish..."
                            className="w-full px-4 py-3 md:py-3 pl-12 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Mobile Filter Button */}
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden w-full mb-4 bg-white border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Filtrlar
                </button>

                <div className="flex gap-6">
                    {/* Filters Sidebar - Desktop always visible, Mobile toggle */}
                    <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0 mb-6 lg:mb-0`}>
                        <div className="bg-white rounded-xl shadow-lg p-4 space-y-6">
                            {/* Categories */}
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800 mb-4">
                                    Kategoriyalar
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition text-base ${selectedCategory === null
                                            ? 'bg-primary text-white'
                                            : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        Barchasi
                                    </button>
                                    {categories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition text-base ${selectedCategory === category.id
                                                ? 'bg-primary text-white'
                                                : 'hover:bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800 mb-4">
                                    Narx (so'm)
                                </h3>
                                <div className="space-y-2">
                                    <input
                                        type="number"
                                        placeholder="Min narx"
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                        className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max narx"
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                        className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <button
                                        onClick={() => setPriceRange({ min: '', max: '' })}
                                        className="text-primary text-base hover:underline"
                                    >
                                        Tozalash
                                    </button>
                                </div>
                            </div>

                            {/* Featured Toggle */}
                            <div>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showFeatured}
                                        onChange={(e) => setShowFeatured(e.target.checked)}
                                        className="w-5 h-5 text-primary rounded focus:ring-primary"
                                    />
                                    <span className="text-gray-700 font-medium text-base">
                                        ⭐ Tavsiya etamiz
                                    </span>
                                </label>
                            </div>

                            {/* Mobile: Close Filters Button */}
                            <button
                                onClick={() => setShowFilters(false)}
                                className="lg:hidden w-full bg-primary text-white py-3 rounded-lg font-semibold"
                            >
                                Saqlash
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="mb-4 text-gray-600 text-sm md:text-base">
                            {filteredProducts.length} ta mahsulot topildi
                        </div>

                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onAddToCart={onAddToCart}
                                        onToggleFavourite={onToggleFavourite}
                                        isFavourite={favourites.includes(product.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <svg className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-500 text-lg mb-4">Hech narsa topilmadi</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setPriceRange({ min: '', max: '' });
                                        setSelectedCategory(null);
                                        setShowFeatured(false);
                                    }}
                                    className="text-primary hover:underline text-base"
                                >
                                    Barcha filtrlarni tozalash
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catalog;
