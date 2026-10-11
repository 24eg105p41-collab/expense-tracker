-- Complete schema (identical to Flyway migrations V1 + V2 + V3).
-- You do NOT need to run this manually: Flyway applies the migrations on startup.
CREATE TABLE IF NOT EXISTS expenses (
    id           BIGINT        NOT NULL AUTO_INCREMENT,
    title        VARCHAR(120)  NOT NULL,
    amount       DECIMAL(12,2) NOT NULL,
    category     VARCHAR(30)   NOT NULL,
    expense_date DATE          NOT NULL,
    description  VARCHAR(500)  NULL,
    created_at   DATETIME(6)   NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at   DATETIME(6)   NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id),
    CONSTRAINT chk_expenses_amount_positive CHECK (amount > 0)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE INDEX idx_expenses_expense_date ON expenses (expense_date);
CREATE INDEX idx_expenses_category     ON expenses (category);
CREATE INDEX idx_expenses_title        ON expenses (title);
