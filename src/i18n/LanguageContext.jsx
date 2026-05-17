import React, { createContext, useContext, useState, useEffect } from 'react';
import { uz } from './uz';
import { ru } from './ru';
import { en } from './en';

const translations = {
    uz,
    ru,
    en
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        // LocalStorage'dan tilni olish
        const saved = localStorage.getItem('language');
        return saved || 'uz';
    });

    useEffect(() => {
        // Til o'zgarganda LocalStorage'ga saqlash
        localStorage.setItem('language', language);
    }, [language]);

    const t = translations[language] || translations['uz'];

    const changeLanguage = (lang) => {
        if (translations[lang]) {
            setLanguage(lang);
        }
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider');
    }
    return context;
};
