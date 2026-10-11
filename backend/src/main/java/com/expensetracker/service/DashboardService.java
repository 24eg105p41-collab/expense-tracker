package com.expensetracker.service;

import com.expensetracker.dto.response.CategorySummary;
import com.expensetracker.dto.response.DashboardResponse;
import com.expensetracker.dto.response.ExpenseResponse;
import com.expensetracker.dto.response.MonthlySummary;
import com.expensetracker.entity.Expense;
import com.expensetracker.mappers.ExpenseMapper;
import com.expensetracker.repository.CategoryTotal;
import com.expensetracker.repository.ExpenseRepository;
import com.expensetracker.util.ConstantsUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Service
public class DashboardService {

    private final ExpenseRepository repository;
    private final ExpenseMapper mapper;

    public DashboardService(ExpenseRepository repository, ExpenseMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public DashboardResponse getDashboard() {
        BigDecimal total = repository.sumAll();
        long count = repository.count();

        YearMonth current = YearMonth.now();
        YearMonth previous = current.minusMonths(1);
        BigDecimal currentMonthTotal = repository.sumBetween(current.atDay(1), current.atEndOfMonth());
        BigDecimal previousMonthTotal = repository.sumBetween(previous.atDay(1), previous.atEndOfMonth());

        BigDecimal average = count == 0
                ? BigDecimal.ZERO.setScale(2)
                : total.divide(BigDecimal.valueOf(count), 2, RoundingMode.HALF_UP);

        List<CategorySummary> breakdown = buildCategoryBreakdown(total);
        String topCategory = breakdown.isEmpty() ? null : breakdown.get(0).label();

        List<ExpenseResponse> recent = repository.findTop5ByOrderByExpenseDateDescIdDesc().stream()
                .limit(ConstantsUtil.RECENT_EXPENSES_LIMIT)
                .map(mapper::toResponse)
                .toList();

        return new DashboardResponse(total, count, currentMonthTotal, previousMonthTotal, average,
                topCategory, breakdown, buildMonthlyTrend(current), recent);
    }

    private List<CategorySummary> buildCategoryBreakdown(BigDecimal grandTotal) {
        return repository.summarizeByCategory().stream()
                .map((CategoryTotal ct) -> {
                    double pct = grandTotal.signum() == 0 ? 0
                            : ct.total().multiply(BigDecimal.valueOf(100))
                            .divide(grandTotal, 1, RoundingMode.HALF_UP).doubleValue();
                    return new CategorySummary(ct.category().name(), ct.category().getLabel(),
                            ct.total(), ct.count() == null ? 0 : ct.count(), pct);
                })
                .toList();
    }

    private List<MonthlySummary> buildMonthlyTrend(YearMonth current) {
        YearMonth first = current.minusMonths(ConstantsUtil.TREND_MONTHS - 1L);

        Map<YearMonth, BigDecimal> totals = new LinkedHashMap<>();
        for (int i = 0; i < ConstantsUtil.TREND_MONTHS; i++) {
            totals.put(first.plusMonths(i), BigDecimal.ZERO);
        }

        LocalDate from = first.atDay(1);
        LocalDate to = current.atEndOfMonth();
        for (Expense e : repository.findByExpenseDateBetween(from, to)) {
            totals.merge(YearMonth.from(e.getExpenseDate()), e.getAmount(), BigDecimal::add);
        }

        return totals.entrySet().stream()
                .map(entry -> new MonthlySummary(
                        entry.getKey().toString(),
                        entry.getKey().getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH)
                                + " " + entry.getKey().getYear(),
                        entry.getValue().setScale(2, RoundingMode.HALF_UP)))
                .toList();
    }
}
