



-- ===============================
-- EXTENSION UUID
-- ===============================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===============================
-- CLIENTS
-- ===============================
CREATE TABLE IF NOT EXISTS clients (
    id UUID PRIMARY KEY,
    name VARCHAR(100),
    gender VARCHAR(10),
    identification VARCHAR(15),
    age INTEGER(2),
    address VARCHAR(200),
    phone_number VARCHAR(10),
    password VARCHAR(200),
    status BOOLEAN
);

-- ===============================
-- ACCOUNTS
-- ===============================
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY,
    client_id UUID NOT NULL,
    number VARCHAR(20) NOT NULL UNIQUE,
    balance NUMERIC(19,2) NOT NULL DEFAULT 0,
    type VARCHAR(20) NOT NULL,

    CONSTRAINT fk_accounts_client
        FOREIGN KEY (client_id)
        REFERENCES clients(id)
        ON DELETE CASCADE
);

-- ===============================
-- MOVEMENTS
-- ===============================
CREATE TABLE IF NOT EXISTS movements (
    id UUID PRIMARY KEY,
    account_id UUID NOT NULL,
    amount NUMERIC(19,2) NOT NULL,
    type VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_movements_account
        FOREIGN KEY (account_id)
        REFERENCES accounts(id)
        ON DELETE CASCADE
);

-- ===============================
-- INDEXES (performance bancaria)
-- ===============================
CREATE INDEX IF NOT EXISTS idx_accounts_client_id
    ON accounts(client_id);

CREATE INDEX IF NOT EXISTS idx_movements_account_id
    ON movements(account_id);

CREATE INDEX IF NOT EXISTS idx_movements_created_at
    ON movements(created_at);