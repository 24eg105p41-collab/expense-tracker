package com.expensetracker.dto.response;

import java.math.BigDecimal;

public record CategorySummary(
        String category,
        String label,
        BigDecimal total,
        long count,
        double percentage
) {
}
