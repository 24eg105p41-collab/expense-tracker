ALTER TABLE expenses
    ADD CONSTRAINT chk_expenses_amount_positive CHECK (amount > 0);
