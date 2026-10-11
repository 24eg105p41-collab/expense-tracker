package com.expensetracker.dto.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record ExpenseResponse(
        Long id,
        String title,
        BigDecimal amount,
        String category,
        String categoryLabel,
        LocalDate expenseDate,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
