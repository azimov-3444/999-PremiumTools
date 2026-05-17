-- Migration to fix categories table and add missing multilingual columns
-- Run this in Supabase SQL Editor to fix the "column does not exist" error

-- 1. Ensure multilingual name columns exist
ALTER TABLE categories ADD COLUMN IF NOT EXISTS name_uz TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS name_ru TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS name_en TEXT;

-- 2. Add description columns for potential future use (consistent with products)
ALTER TABLE categories ADD COLUMN IF NOT EXISTS description_uz TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS description_ru TEXT;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS description_en TEXT;

-- 3. Update existing categories to have data in new columns (if null)
-- This prevents null values for the default language
UPDATE categories SET name_uz = name WHERE name_uz IS NULL;
UPDATE categories SET name_ru = name WHERE name_ru IS NULL;
UPDATE categories SET name_en = name WHERE name_en IS NULL;
