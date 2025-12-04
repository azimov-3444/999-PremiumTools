import React from 'react';
import SEO from './SEO';
import Banner from './Banner';
import Carousel from './Carousel';
import Catalog from './Catalog';

const Home = ({
    products,
    categories,
    onAddToCart,
    onToggleFavourite,
    favourites,
    onNavigate,
    carouselItems
}) => {
    return (
        <div>
            <SEO
                title="Bosh Sahifa"
                description="999 Premium Tools - Zargarlik uskunalari va asboblari do'koni. Eng sifatli mahsulotlar va hamyonbop narxlar."
            />
            <Banner onNavigate={onNavigate} />
            <Carousel items={carouselItems} />
            <Catalog
                products={products}
                categories={categories}
                onAddToCart={onAddToCart}
                onToggleFavourite={onToggleFavourite}
                favourites={favourites}
            />
        </div>
    );
};

export default Home;
