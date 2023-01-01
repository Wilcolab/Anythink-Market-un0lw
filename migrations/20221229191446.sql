UPDATE users SET nickname = 'nic' WHERE nickname IS NULL;
ALTER TABLE users ALTER COLUMN nickname SET not null