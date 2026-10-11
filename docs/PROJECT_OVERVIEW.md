# Project overview

**Expense Tracker** lets a user record daily expenses and understand where money goes.

Objectives (from the project abstract) and where they are implemented:

| Objective | Implementation |
|---|---|
| Simple interface for recording expenses | `ExpenseForm`, `AddExpensePage` |
| Store data systematically in a database | MySQL + Flyway (`db/migration`) |
| CRUD operations | `ExpenseController` -> `ExpenseService` -> `ExpenseRepository` |
| Search and filtering | `ExpenseSpecification`, `ExpenseFilters` |
| Useful summaries | `DashboardService`, `components/dashboard/*` |
| React <-> Spring Boot integration | Axios services in `frontend/src/services` |

Out of scope for this version (listed as future work in the abstract): user authentication / JWT,
budget limits, PDF/CSV reports. The code is layered so they can be added later.
