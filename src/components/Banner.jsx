import React from 'react';

const Banner = ({ onNavigate }) => {
    return (
        <div className="bg-primary text-white py-12 md:py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
                    Premium Zargarlik Uskunalari — Sifat va Ishonch!
                </h1>
                <p className="text-base md:text-xl mb-6 md:mb-8 opacity-90">
                    Professional zargarlik asboblari va uskunalari
                </p>
                <button
                    onClick={() => onNavigate('catalog')}
                    className="bg-white text-primary px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105 w-full sm:w-auto"
                >
                    Katalogga o'tish
                </button>
            </div>
        </div>
    );
};

export default Banner;
