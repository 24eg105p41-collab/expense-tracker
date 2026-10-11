CREATE TABLE expenses (
    id           BIGINT        NOT NULL AUTO_INCREMENT,
    title        VARCHAR(120)  NOT NULL,
    amount       DECIMAL(12,2) NOT NULL,
    category     VARCHAR(30)   NOT NULL,
    expense_date DATE          NOT NULL,
    description  VARCHAR(500)  NULL,
    created_at   DATETIME(6)   NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    updated_at   DATETIME(6)   NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
