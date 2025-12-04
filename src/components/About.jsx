import React from 'react';
import SEO from './SEO';

const About = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <SEO
                title="Biz Haqimizda"
                description="999 Premium Tools - 2015 yildan beri zargarlik sohasida yetakchi do'kon. Bizning tariximiz va ustunliklarimiz haqida bilib oling."
            />
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            999 Premium Tools Haqida
                        </h1>
                        <p className="text-xl text-gray-600">
                            Professional zargarlik uskunalari bo'yicha yetakchi do'kon
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
                        {/* Company Story */}
                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-4">
                                Bizning Tariximiz
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                999 Premium Tools 2015-yilda O'zbekistonda tashkil etilgan va zargarlik sohasida professional
                                asbob-uskunalar bilan ta'minlash bo'yicha ixtisoslashgan. Biz o'z mijozlarimizga yuqori sifatli,
                                ishonchli va zamonaviy uskunalarni taqdim etamiz.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                Yillar davomida biz minglab zargarlar, hunarmandlar va korxonalar bilan hamkorlik qildik.
                                Har bir mijozimiz bizning ustuvor yo'nalishimiz hisoblanadi.
                            </p>
                        </section>

                        {/* Our Advantages */}
                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-4">
                                Bizning Ustunliklarimiz
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                                            ✓
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">
                                            100% Original Mahsulotlar
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Barcha mahsulotlarimiz rasmiy ta'minotchilardan keladi va kafolat bilan ta'minlanadi.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                                            ✓
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">
                                            Professional Maslahat
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Tajribali mutaxassislarimiz sizga to'g'ri tanlashda yordam beradi.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                                            ✓
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">
                                            Tez Yetkazish
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            O'zbekiston bo'ylab tez va xavfsiz yetkazib berish xizmati.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                                            ✓
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800 mb-1">
                                            Hamyonbop Narxlar
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Sifat va narxning eng yaxshi kombinatsiyasi.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Why Choose Us */}
                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-4">
                                Nima Uchun Bizni Tanlashadi?
                            </h2>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">▶</span>
                                    <span>8+ yillik tajriba zargarlik asboblari bozorida</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">▶</span>
                                    <span>5000+ mamnun mijozlar</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">▶</span>
                                    <span>Xalqaro brendlar bilan hamkorlik</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">▶</span>
                                    <span>Sotuvdan keyingi xizmat va texnik qo'llab-quvvatlash</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">▶</span>
                                    <span>Doimiy yangi mahsulotlar va texnologiyalar</span>
                                </li>
                            </ul>
                        </section>

                        {/* Quality Commitment */}
                        <section className="bg-red-50 rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-primary mb-4">
                                Sifat - Bizning Ustuvor Yo'nalishimiz
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                Har bir mahsulot qat'iy sifat nazoratidan o'tadi. Biz faqat ishonchli brendlar va
                                ishlab chiqaruvchilar bilan hamkorlik qilamiz. Sizning muvaffaqiyatingiz - bizning maqsadimiz!
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
