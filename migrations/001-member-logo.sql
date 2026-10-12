-- Run once against the shared Neon database (also read by the ABTO admin dashboard).
ALTER TABLE members ADD COLUMN IF NOT EXISTS logo_key TEXT;
