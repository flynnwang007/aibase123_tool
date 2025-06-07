ALTER TABLE users
DROP COLUMN IF EXISTS reset_token,
DROP COLUMN IF EXISTS reset_token_expires; 