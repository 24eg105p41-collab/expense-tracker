package com.expensetracker.util;

import com.expensetracker.dto.request.ExpenseRequest;
import com.expensetracker.entity.Expense;
import com.expensetracker.entity.ExpenseCategory;

import java.math.BigDecimal;
import java.time.LocalDate;

public final class TestDataBuilder {

    private TestDataBuilder() {
    }

    public static ExpenseRequest request(String title, String amount, ExpenseCategory category, LocalDate date) {
        return new ExpenseRequest(title, new BigDecimal(amount), category, date, "test description");
    }

    public static ExpenseRequest validRequest() {
        return request("Lunch", "12.50", ExpenseCategory.FOOD, LocalDate.now());
    }

    public static Expense expense(Long id, String title, String amount, ExpenseCategory category) {
        Expense e = new Expense();
        e.setId(id);
        e.setTitle(title);
        e.setAmount(new BigDecimal(amount));
        e.setCategory(category);
        e.setExpenseDate(LocalDate.now());
        return e;
    }
}
