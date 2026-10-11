package com.expensetracker.integration;

import com.expensetracker.entity.ExpenseCategory;
import com.expensetracker.repository.ExpenseRepository;
import com.expensetracker.util.TestDataBuilder;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ExpenseIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ExpenseRepository repository;

    @BeforeEach
    void clean() {
        repository.deleteAll();
    }

    private long createExpense(String title, String amount, ExpenseCategory category, LocalDate date) throws Exception {
        String body = objectMapper.writeValueAsString(TestDataBuilder.request(title, amount, category, date));
        String json = mockMvc.perform(post("/api/expenses").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isCreated())
                .andReturn().getResponse().getContentAsString();
        JsonNode node = objectMapper.readTree(json);
        return node.get("id").asLong();
    }

    @Test
    void crudFlow() throws Exception {
        long id = createExpense("Coffee", "3.50", ExpenseCategory.FOOD, LocalDate.now());

        mockMvc.perform(get("/api/expenses/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Coffee"));

        mockMvc.perform(delete("/api/expenses/" + id)).andExpect(status().isNoContent());
        mockMvc.perform(get("/api/expenses/" + id)).andExpect(status().isNotFound());
    }

    @Test
    void searchAndFilter() throws Exception {
        createExpense("Bus pass", "40.00", ExpenseCategory.TRANSPORT, LocalDate.now());
        createExpense("Pizza night", "25.00", ExpenseCategory.FOOD, LocalDate.now());
        createExpense("Old rent", "900.00", ExpenseCategory.HOUSING, LocalDate.now().minusMonths(2));

        mockMvc.perform(get("/api/expenses").param("q", "pizza"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(1));

        mockMvc.perform(get("/api/expenses").param("category", "TRANSPORT"))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.content[0].title").value("Bus pass"));

        mockMvc.perform(get("/api/expenses").param("from", LocalDate.now().minusDays(7).toString()))
                .andExpect(jsonPath("$.totalElements").value(2));

        // search box also matches the category label
        mockMvc.perform(get("/api/expenses").param("q", "housing"))
                .andExpect(jsonPath("$.totalElements").value(1));
    }

    @Test
    void dashboardAggregates() throws Exception {
        createExpense("A", "10.00", ExpenseCategory.FOOD, LocalDate.now());
        createExpense("B", "30.00", ExpenseCategory.FOOD, LocalDate.now());
        createExpense("C", "60.00", ExpenseCategory.TRAVEL, LocalDate.now());

        String json = mockMvc.perform(get("/api/dashboard"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        JsonNode node = objectMapper.readTree(json);

        assertEquals(100.0, node.get("totalExpenses").asDouble(), 0.001);
        assertEquals(3, node.get("expenseCount").asInt());
        assertEquals("Travel", node.get("topCategory").asText());
        assertEquals(6, node.get("monthlyTrend").size());
    }

    @Test
    void categoriesEndpoint() throws Exception {
        mockMvc.perform(get("/api/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(ExpenseCategory.values().length));
    }
}
