import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from './SEO';
import ProductCard from './ProductCard';
import { useLanguage } from '../i18n/LanguageContext';

const Catalog = ({
    products,
    categories,
    onAddToCart,
    onToggleFavourite,
    favourites
}) => {
    const { t, language } = useLanguage();
    const [searchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [showFeatured, setShowFeatured] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [visibleCount, setVisibleCount] = useState(12);
    const [randomizedProducts, setRandomizedProducts] = useState([]);

    // Reset visible count when category or search changes
    useEffect(() => {
        setVisibleCount(12);
    }, [selectedCategory, searchQuery, priceRange]);

    // Initialize randomized products on mount or when products change
    useEffect(() => {
        if (products && products.length > 0) {
            const shuffled = [...products].sort(() => Math.random() - 0.5);
            setRandomizedProducts(shuffled);
        }
    }, [products]);

    // Initialize from URL params
    useEffect(() => {
        const categoryId = searchParams.get('category');
        if (categoryId) {
            setSelectedCategory(parseInt(categoryId));
        }
    }, [searchParams]);

    // Filter products
    const filteredProducts = (randomizedProducts.length > 0 ? randomizedProducts : products).filter(product => {
        if (selectedCategory && product.categoryId !== selectedCategory) return false;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchName = product[`name${language === 'uz' ? 'Uz' : language === 'ru' ? 'Ru' : 'En'}`]?.toLowerCase().includes(query) || product.name.toLowerCase().includes(query);
            const matchDescription = product[`description${language === 'uz' ? 'Uz' : language === 'ru' ? 'Ru' : 'En'}`]?.toLowerCase().includes(query) || product.description?.toLowerCase().includes(query);
            const matchMaterial = product.material?.toLowerCase().includes(query);
            if (!matchName && !matchDescription && !matchMaterial) return false;
        }
        if (priceRange.min && product.price < parseInt(priceRange.min)) return false;
        if (priceRange.max && product.price > parseInt(priceRange.max)) return false;

        // Filter by specific product ID if present in URL
        const productIdParam = searchParams.get('productId');
        if (productIdParam && product.id !== parseInt(productIdParam)) return false;

        return true;
    });

    // Sort by reviews and rating if showFeatured is true
    const sortedProducts = showFeatured
        ? [...filteredProducts].sort((a, b) => {
            // Try different possible field names for reviews
            const aReviews = a.reviewCount || a.reviews?.length || 0;
            const bReviews = b.reviewCount || b.reviews?.length || 0;

            // Try different possible field names for rating
            const aRating = a.rating || a.averageRating || 0;
            const bRating = b.rating || b.averageRating || 0;

            // Calculate score: reviews presence (1000) + rating (x100) + review count
            const aScore = (aReviews > 0 ? 1000 : 0) + (aRating * 100) + aReviews;
            const bScore = (bReviews > 0 ? 1000 : 0) + (bRating * 100) + bReviews;

            return bScore - aScore;
        })
        : filteredProducts;

    // Get current category name
    const currentCategory = selectedCategory
        ? categories.find(c => c.id === selectedCategory)?.[`name${language === 'uz' ? 'Uz' : language === 'ru' ? 'Ru' : 'En'}`] || categories.find(c => c.id === selectedCategory)?.name
        : null;

    return (
        <div className="bg-gray-50 py-6 md:py-12 min-h-screen">
            <SEO
                title={currentCategory ? `${currentCategory} - ${t.catalog.title}` : t.catalog.title}
                description="999 Premium Tools mahsulotlar katalogi. Barcha turdagi zargarlik uskunalari va asboblari."
            />
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">{t.catalog.title}</h2>

                {/* Search Bar */}
                <div className="mb-4 md:mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.common.search}
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
                    {t.catalog.filters}
                </button>

                <div className="flex gap-6">
                    {/* Filters Sidebar - Desktop always visible, Mobile toggle */}
                    <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0 mb-6 lg:mb-0`}>
                        <div className="bg-white rounded-xl shadow-lg p-4 space-y-6">
                            {/* Categories */}
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800 mb-4">
                                    {t.catalog.categories}
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setSelectedCategory(null)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition text-base ${selectedCategory === null
                                            ? 'bg-primary text-white'
                                            : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                    >
                                        {t.catalog.allCategories}
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
                                            {category[`name${language === 'uz' ? 'Uz' : language === 'ru' ? 'Ru' : 'En'}`] || category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800 mb-4">
                                    {t.catalog.priceRange} ({t.product.som})
                                </h3>
                                <div className="space-y-2">
                                    <input
                                        type="number"
                                        placeholder={t.catalog.minPrice}
                                        value={priceRange.min}
                                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                        className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <input
                                        type="number"
                                        placeholder={t.catalog.maxPrice}
                                        value={priceRange.max}
                                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                        className="w-full px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                    <button
                                        onClick={() => setPriceRange({ min: '', max: '' })}
                                        className="text-primary text-base hover:underline"
                                    >
                                        {t.catalog.clearFilters}
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
                                        {t.catalog.recommended}
                                    </span>
                                </label>
                            </div>

                            {/* Mobile: Close Filters Button */}
                            <button
                                onClick={() => setShowFilters(false)}
                                className="lg:hidden w-full bg-primary text-white py-3 rounded-lg font-semibold"
                            >
                                {t.catalog.saveFilters}
                            </button>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="mb-4"></div>

                        {sortedProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                                    {sortedProducts.slice(0, visibleCount).map(product => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onAddToCart={onAddToCart}
                                            onToggleFavourite={onToggleFavourite}
                                            isFavourite={favourites.includes(product.id)}
                                        />
                                    ))}
                                </div>

                                {visibleCount < sortedProducts.length && (
                                    <div className="mt-12 text-center">
                                        <button
                                            onClick={() => setVisibleCount(prev => prev + 16)}
                                            className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-bold transition-all duration-300 shadow-md hover:shadow-lg inline-flex items-center gap-2 group"
                                        >
                                            {t.catalog.showMore}
                                            <svg
                                                className="w-5 h-5 transform group-hover:translate-y-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <svg className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-gray-500 text-lg mb-4">{t.catalog.noProducts}</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setPriceRange({ min: '', max: '' });
                                        setSelectedCategory(null);
                                        setShowFeatured(false);
                                    }}
                                    className="text-primary hover:underline text-base"
                                >
                                    {t.catalog.tryAdjusting}
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
