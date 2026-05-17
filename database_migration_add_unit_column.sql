-- Migration to add unit column to products table
-- Run this in Supabase SQL Editor

ALTER TABLE products ADD COLUMN IF NOT EXISTS unit TEXT DEFAULT 'piece';

-- Update existing products to have 'piece' unit if null
UPDATE products SET unit = 'piece' WHERE unit IS NULL;
