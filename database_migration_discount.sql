-- Migration: Mahsulotlarni tahrirlash va chegirmalar uchun
-- Sana: 2025-12-05

-- 1. Products jadvaliga discount ustuni qo'shish
ALTER TABLE products ADD COLUMN IF NOT EXISTS discount INTEGER DEFAULT 0;
-- discount - foizda chegirma (masalan: 10, 20, 50)

-- 2. Index yaratish (tez qidiruv uchun)
CREATE INDEX IF NOT EXISTS idx_products_discount ON products(discount) WHERE discount > 0;

-- 3. Comment qo'shish
COMMENT ON COLUMN products.discount IS 'Chegirma foizda (0 = chegirma yo''q, 10 = 10% chegirma)';

-- Misol qo'llash:
-- UPDATE products SET discount = 20 WHERE id = 1; -- 20% chegirma
-- UPDATE products SET discount = 0 WHERE id = 1;  -- Chegirmani olib tashlash
