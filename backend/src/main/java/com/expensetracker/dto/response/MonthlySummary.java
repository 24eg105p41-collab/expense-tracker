package com.expensetracker.dto.response;

import java.math.BigDecimal;

public record MonthlySummary(String month, String label, BigDecimal total) {
}
