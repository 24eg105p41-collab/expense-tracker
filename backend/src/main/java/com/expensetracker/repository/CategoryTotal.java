package com.expensetracker.repository;

import com.expensetracker.entity.ExpenseCategory;

import java.math.BigDecimal;

/** Projection used by the category aggregation query. */
public record CategoryTotal(ExpenseCategory category, BigDecimal total, Long count) {
}
