import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = ({ items = [] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (items.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % items.length);
        }, 3000);

        return () => clearInterval(timer);
    }, [items.length]);

    if (items.length === 0) return null;

    return (
        <div className="bg-white py-8">
            <div className="container mx-auto px-4">
                <div className="relative h-[400px] md:h-[500px] rounded-2xl shadow-lg overflow-hidden group">
                    {items.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            {/* Image Background */}
                            <div className="absolute inset-0">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 max-w-2xl">
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 transform transition-transform duration-700 translate-y-0">
                                    {slide.title}
                                </h2>
                                <p className="text-lg md:text-xl text-gray-200 transform transition-transform duration-700 delay-100 mb-8">
                                    {slide.description}
                                </p>
                                {slide.buttonText && slide.link && (
                                    <Link
                                        to={slide.link}
                                        className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors transform transition-transform duration-700 delay-200 w-fit"
                                    >
                                        {slide.buttonText}
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Indicators */}
                    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'w-8 bg-primary'
                                    : 'w-2 bg-white/50 hover:bg-white'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev - 1 + items.length) % items.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % items.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;
