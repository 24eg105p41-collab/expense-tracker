package com.expensetracker.dto.response;

import java.math.BigDecimal;
import java.util.List;

public record DashboardResponse(
        BigDecimal totalExpenses,
        long expenseCount,
        BigDecimal currentMonthTotal,
        BigDecimal previousMonthTotal,
        BigDecimal averageExpense,
        String topCategory,
        List<CategorySummary> categoryBreakdown,
        List<MonthlySummary> monthlyTrend,
        List<ExpenseResponse> recentExpenses
) {
}
