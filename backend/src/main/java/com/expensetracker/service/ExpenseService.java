package com.expensetracker.service;

import com.expensetracker.dto.request.ExpenseRequest;
import com.expensetracker.dto.response.CategoryResponse;
import com.expensetracker.dto.response.ExpenseResponse;
import com.expensetracker.dto.response.PageResponse;
import com.expensetracker.entity.Expense;
import com.expensetracker.entity.ExpenseCategory;
import com.expensetracker.exception.ExpenseNotFoundException;
import com.expensetracker.mappers.ExpenseMapper;
import com.expensetracker.repository.ExpenseRepository;
import com.expensetracker.repository.ExpenseSpecification;
import com.expensetracker.util.ConstantsUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
public class ExpenseService {

    private final ExpenseRepository repository;
    private final ExpenseMapper mapper;

    public ExpenseService(ExpenseRepository repository, ExpenseMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Transactional(readOnly = true)
    public PageResponse<ExpenseResponse> search(String query, ExpenseCategory category,
                                                LocalDate from, LocalDate to,
                                                int page, int size, String sortBy, String direction) {
        if (from != null && to != null && from.isAfter(to)) {
            throw new IllegalArgumentException("'from' date must not be after 'to' date");
        }
        String sortField = sortBy == null || sortBy.isBlank() ? ConstantsUtil.DEFAULT_SORT_FIELD : sortBy;
        if (!ConstantsUtil.ALLOWED_SORT_FIELDS.contains(sortField)) {
            throw new IllegalArgumentException("Cannot sort by '" + sortField + "'");
        }
        Sort.Direction dir = Sort.Direction.fromString(direction == null ? "desc" : direction);
        Sort sort = Sort.by(dir, sortField).and(Sort.by(Sort.Direction.DESC, "id"));

        int safeSize = Math.min(Math.max(size, 1), ConstantsUtil.MAX_PAGE_SIZE);
        Pageable pageable = PageRequest.of(Math.max(page, 0), safeSize, sort);

        Page<ExpenseResponse> result = repository
                .findAll(ExpenseSpecification.withFilters(query, category, from, to), pageable)
                .map(mapper::toResponse);
        return PageResponse.from(result);
    }

    @Transactional(readOnly = true)
    public ExpenseResponse getById(Long id) {
        return mapper.toResponse(findOrThrow(id));
    }

    @Transactional
    public ExpenseResponse create(ExpenseRequest request) {
        Expense saved = repository.save(mapper.toEntity(request));
        return mapper.toResponse(saved);
    }

    @Transactional
    public ExpenseResponse update(Long id, ExpenseRequest request) {
        Expense expense = findOrThrow(id);
        mapper.updateEntity(expense, request);
        return mapper.toResponse(repository.save(expense));
    }

    @Transactional
    public void delete(Long id) {
        Expense expense = findOrThrow(id);
        repository.delete(expense);
    }

    public List<CategoryResponse> getCategories() {
        return Arrays.stream(ExpenseCategory.values())
                .map(c -> new CategoryResponse(c.name(), c.getLabel()))
                .toList();
    }

    private Expense findOrThrow(Long id) {
        return repository.findById(id).orElseThrow(() -> new ExpenseNotFoundException(id));
    }
}
