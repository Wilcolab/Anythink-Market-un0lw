ALTER TABLE users DROP COLUMN nickname;
ALTER TABLE users ADD COLUMN nickname varchar(20) NOT NULL;