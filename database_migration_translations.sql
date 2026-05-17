-- Migration: Mahsulotlar uchun ko'p til qo'llab-quvvatlash
-- Sana: 2025-12-05

-- 1. Products jadvaliga til ustunlarini qo'shish
ALTER TABLE products ADD COLUMN IF NOT EXISTS name_uz TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS name_ru TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS name_en TEXT;

ALTER TABLE products ADD COLUMN IF NOT EXISTS description_uz TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS description_ru TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS description_en TEXT;

-- 2. Mavjud ma'lumotlarni ko'chirish (name -> name_uz)
UPDATE products SET name_uz = name WHERE name_uz IS NULL;
UPDATE products SET description_uz = description WHERE description_uz IS NULL;

-- 3. Comment qo'shish
COMMENT ON COLUMN products.name_uz IS 'Mahsulot nomi (O''zbekcha)';
COMMENT ON COLUMN products.name_ru IS 'Mahsulot nomi (Ruscha)';
COMMENT ON COLUMN products.name_en IS 'Mahsulot nomi (Inglizcha)';

-- Eslatma: Eski name va description ustunlarini saqlab qolamiz (backward compatibility)
