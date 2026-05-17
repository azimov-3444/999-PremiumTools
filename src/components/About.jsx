import React from 'react';
import SEO from './SEO';
import { useLanguage } from '../i18n/LanguageContext';

const About = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <SEO
                title={t.about.title}
                description={t.about.subtitle}
            />
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            {t.about.title}
                        </h1>
                        <p className="text-xl text-gray-600">
                            {t.about.subtitle}
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
                        {/* Company Story */}
                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-4">
                                {t.about.story.title}
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                {t.about.story.text}
                            </p>
                        </section>

                        {/* Our Advantages */}
                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-4">
                                {t.about.why.title}
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
                                            {t.about.why.quality}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {t.about.why.qualityText}
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
                                            {t.about.why.experience}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {t.about.why.experienceText}
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
                                            {t.about.why.delivery}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {t.about.why.deliveryText}
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
                                            {t.about.why.support}
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            {t.about.why.supportText}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Values */}
                        <section>
                            <h2 className="text-2xl font-bold text-primary mb-4">
                                {t.about.values.title}
                            </h2>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">▶</span>
                                    <span>{t.about.values.quality}: {t.about.values.qualityText}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">▶</span>
                                    <span>{t.about.values.service}: {t.about.values.serviceText}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">▶</span>
                                    <span>{t.about.values.innovation}: {t.about.values.innovationText}</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-primary mt-1">▶</span>
                                    <span>{t.about.values.trust}: {t.about.values.trustText}</span>
                                </li>
                            </ul>
                        </section>

                        {/* Mission */}
                        <section className="bg-red-50 rounded-lg p-6">
                            <h2 className="text-2xl font-bold text-primary mb-4">
                                {t.about.mission.title}
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {t.about.mission.text}
                            </p>
                        </section>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;
