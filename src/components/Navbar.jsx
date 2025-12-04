import React, { useState } from 'react';

const Navbar = ({ currentUser, onLogout, onNavigate, cartCount, favouritesCount }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleNavigation = (path) => {
        onNavigate(path);
        setMobileMenuOpen(false);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div
                        className="text-xl md:text-2xl font-bold text-primary cursor-pointer hover:opacity-80 transition"
                        onClick={() => handleNavigation('')}
                    >
                        999 Premium Tools
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        <button
                            onClick={() => handleNavigation('catalog')}
                            className="text-gray-700 hover:text-primary transition font-medium"
                        >
                            Katalog
                        </button>

                        <button
                            onClick={() => handleNavigation('about')}
                            className="text-gray-700 hover:text-primary transition font-medium"
                        >
                            Biz Haqimizda
                        </button>

                        <button
                            onClick={() => handleNavigation('contact')}
                            className="text-gray-700 hover:text-primary transition font-medium"
                        >
                            Kontaktlar
                        </button>

                        <button
                            onClick={() => handleNavigation('favourites')}
                            className="text-gray-700 hover:text-primary transition font-medium relative"
                        >
                            Sevimlilar
                            {favouritesCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {favouritesCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => handleNavigation('cart')}
                            className="text-gray-700 hover:text-primary transition font-medium relative"
                        >
                            Savatcha
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {currentUser ? (
                            <div className="flex items-center gap-3">
                                <span className="text-gray-700">
                                    {currentUser.firstName} {currentUser.lastName}
                                </span>
                                {currentUser.role === 'admin' && (
                                    <button
                                        onClick={() => handleNavigation('admin')}
                                        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium"
                                    >
                                        Admin Panel
                                    </button>
                                )}
                                <button
                                    onClick={onLogout}
                                    className="border border-primary text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition font-medium"
                                >
                                    Chiqish
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => handleNavigation('login')}
                                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium"
                            >
                                Kirish
                            </button>
                        )}
                    </div>

                    {/* Mobile Icons */}
                    <div className="flex lg:hidden items-center gap-3">
                        {/* Cart Icon */}
                        <button
                            onClick={() => handleNavigation('cart')}
                            className="relative p-2"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Burger Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2"
                        >
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t">
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => handleNavigation('catalog')}
                                className="text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                            >
                                Katalog
                            </button>

                            <button
                                onClick={() => handleNavigation('about')}
                                className="text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                            >
                                Biz Haqimizda
                            </button>

                            <button
                                onClick={() => handleNavigation('contact')}
                                className="text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
                            >
                                Kontaktlar
                            </button>

                            <button
                                onClick={() => handleNavigation('favourites')}
                                className="text-left px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium flex items-center justify-between"
                            >
                                <span>Sevimlilar</span>
                                {favouritesCount > 0 && (
                                    <span className="bg-primary text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                                        {favouritesCount}
                                    </span>
                                )}
                            </button>

                            {currentUser ? (
                                <>
                                    <div className="px-4 py-2 text-gray-600 border-t mt-2 pt-4">
                                        {currentUser.firstName} {currentUser.lastName}
                                    </div>
                                    {currentUser.role === 'admin' && (
                                        <button
                                            onClick={() => handleNavigation('admin')}
                                            className="text-left px-4 py-3 bg-primary text-white rounded-lg hover:bg-red-700 font-medium"
                                        >
                                            Admin Panel
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            onLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="text-left px-4 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white font-medium"
                                    >
                                        Chiqish
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => handleNavigation('login')}
                                    className="text-left px-4 py-3 bg-primary text-white rounded-lg hover:bg-red-700 font-medium"
                                >
                                    Kirish
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
