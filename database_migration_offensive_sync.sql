-- Migration for Offline Store Integration

-- Add external_id to link with "Linked" app products
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS external_id TEXT;

-- Add timestamp to track synchronization
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS last_synced_at TIMESTAMPTZ;

-- Add index for faster lookups during sync
CREATE INDEX IF NOT EXISTS idx_products_external_id ON products(external_id);

-- Add comment
COMMENT ON COLUMN products.external_id IS 'ID from the external Linked offline store application';
