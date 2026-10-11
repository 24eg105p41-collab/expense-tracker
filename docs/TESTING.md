# Testing

Backend (JUnit 5, Mockito, MockMvc, in-memory H2 - no MySQL required):

```bash
cd backend && mvn test
```

- `ExpenseServiceTest` - service logic with a mocked repository
- `ExpenseControllerTest` - `@WebMvcTest` for status codes and validation errors
- `ExpenseIntegrationTest` - full Spring context: CRUD, search/filter, dashboard, categories

Frontend (Vitest):

```bash
cd frontend && npm install && npm test
npm run typecheck
```

Manual smoke test: add an expense, search for it, filter by category, edit it, check the dashboard, delete it.
