package com.expensetracker.controller;

import com.expensetracker.dto.request.ExpenseRequest;
import com.expensetracker.dto.response.ExpenseResponse;
import com.expensetracker.entity.ExpenseCategory;
import com.expensetracker.exception.ExpenseNotFoundException;
import com.expensetracker.service.ExpenseService;
import com.expensetracker.util.TestDataBuilder;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ExpenseController.class)
class ExpenseControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ExpenseService expenseService;

    @Test
    void createReturns201() throws Exception {
        ExpenseResponse response = new ExpenseResponse(1L, "Lunch", new BigDecimal("12.50"), "FOOD",
                "Food & Dining", LocalDate.now(), "test description", LocalDateTime.now(), LocalDateTime.now());
        when(expenseService.create(any(ExpenseRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/expenses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(TestDataBuilder.validRequest())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Lunch"));
    }

    @Test
    void createWithInvalidBodyReturns400WithFieldErrors() throws Exception {
        ExpenseRequest invalid = new ExpenseRequest("", new BigDecimal("-1"), ExpenseCategory.FOOD,
                LocalDate.now(), null);

        mockMvc.perform(post("/api/expenses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalid)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.fieldErrors.title").exists())
                .andExpect(jsonPath("$.fieldErrors.amount").exists());
    }

    @Test
    void getMissingReturns404() throws Exception {
        when(expenseService.getById(42L)).thenThrow(new ExpenseNotFoundException(42L));

        mockMvc.perform(get("/api/expenses/42"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Expense not found with id 42"));
    }

    @Test
    void invalidCategoryParamReturns400() throws Exception {
        mockMvc.perform(get("/api/expenses").param("category", "NOT_A_CATEGORY"))
                .andExpect(status().isBadRequest());
    }
}
