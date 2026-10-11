package com.expensetracker.repository;

import com.expensetracker.entity.Expense;
import com.expensetracker.entity.ExpenseCategory;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/** Builds the dynamic WHERE clause for search + filter. */
public final class ExpenseSpecification {

    private ExpenseSpecification() {
    }

    public static Specification<Expense> withFilters(String query, ExpenseCategory category,
                                                     LocalDate from, LocalDate to) {
        return (root, cq, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (query != null && !query.isBlank()) {
                String term = query.trim().toLowerCase();
                String pattern = "%" + escapeLike(term) + "%";

                List<Predicate> any = new ArrayList<>();
                any.add(cb.like(cb.lower(root.<String>get("title")), pattern, '\\'));
                any.add(cb.like(cb.lower(root.<String>get("description")), pattern, '\\'));

                // Let the search box also match the category (by code or display label)
                Set<ExpenseCategory> matching = Arrays.stream(ExpenseCategory.values())
                        .filter(c -> c.name().toLowerCase().contains(term)
                                || c.getLabel().toLowerCase().contains(term))
                        .collect(Collectors.toSet());
                if (!matching.isEmpty()) {
                    any.add(root.get("category").in(matching));
                }
                predicates.add(cb.or(any.toArray(new Predicate[0])));
            }

            if (category != null) {
                predicates.add(cb.equal(root.get("category"), category));
            }
            if (from != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.<LocalDate>get("expenseDate"), from));
            }
            if (to != null) {
                predicates.add(cb.lessThanOrEqualTo(root.<LocalDate>get("expenseDate"), to));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }

    private static String escapeLike(String value) {
        return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_");
    }
}
