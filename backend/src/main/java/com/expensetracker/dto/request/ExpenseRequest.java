package com.expensetracker.dto.request;

import com.expensetracker.entity.ExpenseCategory;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ExpenseRequest(
        @NotBlank(message = "Title is required")
        @Size(max = 120, message = "Title must be at most 120 characters")
        String title,

        @NotNull(message = "Amount is required")
        @DecimalMin(value = "0.01", message = "Amount must be at least 0.01")
        @Digits(integer = 10, fraction = 2, message = "Amount allows up to 10 digits and 2 decimals")
        BigDecimal amount,

        @NotNull(message = "Category is required")
        ExpenseCategory category,

        @NotNull(message = "Date is required")
        LocalDate expenseDate,

        @Size(max = 500, message = "Description must be at most 500 characters")
        String description
) {
}
