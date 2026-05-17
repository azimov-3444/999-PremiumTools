-- Migration: All tables multi-language support
-- Date: 2025-12-17

-- 1. Products table (Ensure columns exist)
ALTER TABLE products ADD COLUMN IF NOT EXISTS name_uz TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS name_ru TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS name_en TEXT;

ALTER TABLE products ADD COLUMN IF NOT EXISTS description_uz TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS description_ru TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS description_en TEXT;

-- 2. Categories table
ALTER TABLE categories ADD COLUMN IF NOT EXISTS name_uz TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS name_ru TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS name_en TEXT;

-- Initialize new category columns with existing name
UPDATE categories SET name_uz = name WHERE name_uz IS NULL;
UPDATE categories SET name_ru = name WHERE name_ru IS NULL;
UPDATE categories SET name_en = name WHERE name_en IS NULL;

-- 3. Carousel Items table
ALTER TABLE carousel_items ADD COLUMN IF NOT EXISTS title_uz TEXT;
ALTER TABLE carousel_items ADD COLUMN IF NOT EXISTS title_ru TEXT;
ALTER TABLE carousel_items ADD COLUMN IF NOT EXISTS title_en TEXT;

ALTER TABLE carousel_items ADD COLUMN IF NOT EXISTS description_uz TEXT;
ALTER TABLE carousel_items ADD COLUMN IF NOT EXISTS description_ru TEXT;
ALTER TABLE carousel_items ADD COLUMN IF NOT EXISTS description_en TEXT;

ALTER TABLE carousel_items ADD COLUMN IF NOT EXISTS button_text_uz TEXT;
ALTER TABLE carousel_items ADD COLUMN IF NOT EXISTS button_text_ru TEXT;
ALTER TABLE carousel_items ADD COLUMN IF NOT EXISTS button_text_en TEXT;

-- Initialize new carousel columns
UPDATE carousel_items SET title_uz = title WHERE title_uz IS NULL;
UPDATE carousel_items SET description_uz = description WHERE description_uz IS NULL;
UPDATE carousel_items SET button_text_uz = button_text WHERE button_text_uz IS NULL;
