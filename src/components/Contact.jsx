import React from 'react';
import SEO from './SEO';

const Contact = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-8 md:py-12">
            <SEO
                title="Bog'lanish"
                description="Biz bilan bog'laning: Manzil, telefon raqamlar va ish vaqti. Toshkent sh., Chilonzor tumani."
            />
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
                            Biz Bilan Bog'lanish
                        </h1>
                        <p className="text-base md:text-xl text-gray-600">
                            Savollaringiz bormi? Biz sizga yordam berishga tayyormiz!
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                        {/* Contact Information */}
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">
                                Bog'lanish Ma'lumotlari
                            </h2>

                            <div className="space-y-6">
                                {/* Address */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Manzil</h3>
                                        <p className="text-sm md:text-base text-gray-600">
                                            Toshkent sh., Chilonzor tumani,<br />
                                            Katta Bozor ko'chasi, 123-uy
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Telefon</h3>
                                        <p className="text-sm md:text-base text-gray-600">
                                            +998 (90) 123-45-67<br />
                                            +998 (91) 234-56-78
                                        </p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                                        <p className="text-sm md:text-base text-gray-600">
                                            info@999premiumtools.uz<br />
                                            support@999premiumtools.uz
                                        </p>
                                    </div>
                                </div>

                                {/* Working Hours */}
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">Ish Vaqti</h3>
                                        <p className="text-sm md:text-base text-gray-600">
                                            Dushanba - Shanba: 9:00 - 19:00<br />
                                            Yakshanba: Dam olish
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="mt-8 pt-6 border-t">
                                <h3 className="font-semibold text-gray-800 mb-4">Ijtimoiy Tarmoqlar</h3>
                                <div className="flex gap-3">
                                    <a href="#" className="w-12 h-12 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white hover:bg-blue-700 transition">
                                        <span className="font-bold">f</span>
                                    </a>
                                    <a href="#" className="w-12 h-12 md:w-10 md:h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white hover:opacity-90 transition">
                                        <span className="font-bold">📷</span>
                                    </a>
                                    <a href="#" className="w-12 h-12 md:w-10 md:h-10 bg-blue-400 rounded-lg flex items-center justify-center text-white hover:bg-blue-500 transition">
                                        <span className="font-bold">t</span>
                                    </a>
                                    <a href="#" className="w-12 h-12 md:w-10 md:h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transition">
                                        <span className="font-bold">TG</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                            <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">
                                Bizning Do'kon Joylashuvi
                            </h2>

                            {/* Google Maps */}
                            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-4">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.358893866166!2d69.22334931541926!3d41.31151790893467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1234567890123"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="999 Premium Tools Location"
                                ></iframe>
                            </div>

                            <div className="bg-red-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-2">
                                    🚗 Qanday Yetib Borish Mumkin?
                                </h3>
                                <ul className="text-sm text-gray-600 space-y-1">
                                    <li>• Metro: Chilonzor bekati (5 daqiqa piyoda)</li>
                                    <li>• Avtobus: 23, 45, 78-raqamli marshrutlar</li>
                                    <li>• Taksi: "Chilonzor", Katta Bozor yonida</li>
                                    <li>• Mashinada: Bepul to'xtash joyi mavjud</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Delivery & Payment Info */}
                    <div className="mt-6 md:mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8">
                        <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">
                            Yetkazish va To'lov Haqida
                        </h2>

                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <span className="text-primary text-xl">🚚</span>
                                    Yetkazish
                                </h3>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>• Toshkent bo'ylab - 1-2 kun</li>
                                    <li>• Boshqa viloyatlar - 3-5 kun</li>
                                    <li>• 500,000 so'mdan yuqori - Bepul</li>
                                    <li>• Kuryer orqali eshikkacha</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <span className="text-primary text-xl">💳</span>
                                    To'lov Usullari
                                </h3>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>• Naqd pul</li>
                                    <li>• Bank kartasi</li>
                                    <li>• Payme / Click</li>
                                    <li>• Bank o'tkazmasi</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <span className="text-primary text-xl">🛡️</span>
                                    Kafolat
                                </h3>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li>• Rasmiy kafolat 1-2 yil</li>
                                    <li>• 14 kun ichida qaytarish</li>
                                    <li>• Bepul texnik xizmat</li>
                                    <li>• Almashtirish imkoniyati</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
