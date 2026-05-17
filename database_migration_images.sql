-- Migration: Mahsulot rasmlar (galereya)
-- Sana: 2025-12-05

-- 1. Products jadvaliga images ustuni qo'shish (JSONB array)
ALTER TABLE products ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '[]'::jsonb;

-- 2. Mavjud image maydonini images ga ko'chirish (agar bosh bo'lmasa)
UPDATE products 
SET images = jsonb_build_array(jsonb_build_object('url', image, 'is_primary', true))
WHERE image IS NOT NULL AND image != '' AND (images IS NULL OR images = '[]'::jsonb);

-- 3. Comment
COMMENT ON COLUMN products.images IS 'Mahsulot rasmlari (max 4 ta). Format: [{"url": "...", "is_primary": true}, ...]';

-- Tayyor!
-- Endi mahsulotlarga 4 tagacha rasm qo'shish mumkin
