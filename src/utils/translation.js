// Bepul tarjima funksiyasi (MyMemory API)
// Hech qanday kalit yoki ro'yxatdan o'tish kerak emas!

export const translateText = async (text, targetLang) => {
    if (!text || !text.trim()) return '';

    try {
        const sourceLang = 'uz'; // Doimo o'zbekchadan

        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
        );

        const data = await response.json();

        if (data.responseStatus === 200 && data.responseData) {
            return data.responseData.translatedText;
        }

        return text; // Agar tarjima bo'lmasa, asl matnni qaytaradi
    } catch (error) {
        console.error('Translation error:', error);
        return text; // Xato bo'lsa, asl matnni qaytaradi
    }
};

// Ko'p tilga tarjima qilish (bir vaqtning o'zida)
export const translateToMultipleLanguages = async (text, languages = ['ru', 'en']) => {
    const translations = { uz: text }; // O'zbek asl matn

    for (const lang of languages) {
        const translated = await translateText(text, lang);
        translations[lang] = translated;

        // API limit: 1 soniyada bir marta
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return translations;
};

// Mahsulotni tarjima qilish (nom va tavsif)
export const translateProduct = async (productData) => {
    const { name, description } = productData;

    // Nom tarjimasi
    const nameTranslations = await translateToMultipleLanguages(name, ['ru', 'en']);

    // Tavsif tarjimasi (agar mavjud bo'lsa)
    let descriptionTranslations = { uz: description || '' };
    if (description && description.trim()) {
        descriptionTranslations = await translateToMultipleLanguages(description, ['ru', 'en']);
    }

    return {
        name_uz: nameTranslations.uz,
        name_ru: nameTranslations.ru,
        name_en: nameTranslations.en,
        description_uz: descriptionTranslations.uz,
        description_ru: descriptionTranslations.ru || '',
        description_en: descriptionTranslations.en || ''
    };
};

// Misol:
// const translations = await translateProduct({ name: "Oltin zanjir", description: "18 karat oltin" });
// Natija:
// {
//   name_uz: "Oltin zanjir",
//   name_ru: "Золотая цепь",
//   name_en: "Gold chain",
//   description_uz: "18 karat oltin",
//   description_ru: "18-каратное золото",
//   description_en: "18 karat gold"
// }
