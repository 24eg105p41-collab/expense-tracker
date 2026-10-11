package com.expensetracker.repository;

import com.expensetracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long>, JpaSpecificationExecutor<Expense> {

    @Query("select coalesce(sum(e.amount), 0) from Expense e")
    BigDecimal sumAll();

    @Query("select coalesce(sum(e.amount), 0) from Expense e where e.expenseDate between :from and :to")
    BigDecimal sumBetween(@Param("from") LocalDate from, @Param("to") LocalDate to);

    @Query("select new com.expensetracker.repository.CategoryTotal(e.category, sum(e.amount), count(e)) "
            + "from Expense e group by e.category order by sum(e.amount) desc")
    List<CategoryTotal> summarizeByCategory();

    List<Expense> findByExpenseDateBetween(LocalDate from, LocalDate to);

    List<Expense> findTop5ByOrderByExpenseDateDescIdDesc();
}
