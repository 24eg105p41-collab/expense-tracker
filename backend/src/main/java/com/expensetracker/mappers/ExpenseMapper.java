package com.expensetracker.mappers;

import com.expensetracker.dto.request.ExpenseRequest;
import com.expensetracker.dto.response.ExpenseResponse;
import com.expensetracker.entity.Expense;
import org.springframework.stereotype.Component;

@Component
public class ExpenseMapper {

    public Expense toEntity(ExpenseRequest request) {
        Expense expense = new Expense();
        updateEntity(expense, request);
        return expense;
    }

    public void updateEntity(Expense expense, ExpenseRequest request) {
        expense.setTitle(request.title().trim());
        expense.setAmount(request.amount());
        expense.setCategory(request.category());
        expense.setExpenseDate(request.expenseDate());
        String description = request.description();
        expense.setDescription(description == null || description.isBlank() ? null : description.trim());
    }

    public ExpenseResponse toResponse(Expense e) {
        return new ExpenseResponse(
                e.getId(),
                e.getTitle(),
                e.getAmount(),
                e.getCategory().name(),
                e.getCategory().getLabel(),
                e.getExpenseDate(),
                e.getDescription(),
                e.getCreatedAt(),
                e.getUpdatedAt());
    }
}
