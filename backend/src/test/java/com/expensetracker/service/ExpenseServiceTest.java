package com.expensetracker.service;

import com.expensetracker.dto.response.ExpenseResponse;
import com.expensetracker.entity.Expense;
import com.expensetracker.entity.ExpenseCategory;
import com.expensetracker.exception.ExpenseNotFoundException;
import com.expensetracker.mappers.ExpenseMapper;
import com.expensetracker.repository.ExpenseRepository;
import com.expensetracker.util.TestDataBuilder;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ExpenseServiceTest {

    @Mock
    private ExpenseRepository repository;

    private final ExpenseMapper mapper = new ExpenseMapper();

    private ExpenseService service() {
        return new ExpenseService(repository, mapper);
    }

    @Test
    void createSavesAndReturnsResponse() {
        when(repository.save(any(Expense.class))).thenAnswer(inv -> {
            Expense e = inv.getArgument(0);
            e.setId(1L);
            return e;
        });

        ExpenseResponse response = service().create(TestDataBuilder.validRequest());

        assertEquals(1L, response.id());
        assertEquals("Lunch", response.title());
        assertEquals("FOOD", response.category());
        assertEquals("Food & Dining", response.categoryLabel());
    }

    @Test
    void getByIdThrowsWhenMissing() {
        when(repository.findById(99L)).thenReturn(Optional.empty());
        assertThrows(ExpenseNotFoundException.class, () -> service().getById(99L));
    }

    @Test
    void deleteThrowsWhenMissing() {
        when(repository.findById(5L)).thenReturn(Optional.empty());
        assertThrows(ExpenseNotFoundException.class, () -> service().delete(5L));
        verify(repository, never()).delete(any(Expense.class));
    }

    @Test
    void updateChangesFields() {
        Expense existing = TestDataBuilder.expense(3L, "Old", "5.00", ExpenseCategory.OTHER);
        when(repository.findById(3L)).thenReturn(Optional.of(existing));
        when(repository.save(any(Expense.class))).thenAnswer(inv -> inv.getArgument(0));

        ExpenseResponse response = service().update(3L, TestDataBuilder.validRequest());

        assertEquals("Lunch", response.title());
        assertEquals("FOOD", response.category());
    }

    @Test
    void searchRejectsInvertedDateRange() {
        assertThrows(IllegalArgumentException.class, () -> service().search(
                null, null, LocalDate.of(2026, 5, 10), LocalDate.of(2026, 5, 1),
                0, 10, "expenseDate", "desc"));
    }

    @Test
    void searchRejectsUnknownSortField() {
        assertThrows(IllegalArgumentException.class, () -> service().search(
                null, null, null, null, 0, 10, "password", "desc"));
    }
}
