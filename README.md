# Expense Tracker

A beginner-friendly full-stack web application to **record, organise and monitor daily expenses**.

| Layer | Technology |
|---|---|
| Language | Java 21 |
| Backend | Spring Boot 3.3, Spring Data JPA / Hibernate, Flyway, springdoc (Swagger) |
| Database | MySQL 8 |
| Frontend | React 18 + TypeScript (Vite), React Router, Axios |
| Build | Maven (backend), npm (frontend) |
| Deployment | Docker Compose (MySQL + Spring Boot + nginx serving React) |

## Features

- **Add / View / Edit / Delete** expenses (title, amount, category, date, description)
- **Search** by title, description or category
- **Filter** by category and date range, **sort** by any column, **paginate**
- **Dashboard**: total spent, this month vs last month, average, top category, spending by category, 6-month trend, recent expenses
- Server-side validation + friendly error messages
- Responsive layout (table turns into cards on phones), light/dark theme
- REST API documented with Swagger UI

## Quick start (Docker - recommended / deployment)

```bash
./scripts/setup.sh      # creates .env with random DB passwords
./scripts/deploy.sh     # builds and starts everything
```

Open **http://localhost/** (change `APP_PORT` in `.env` to use another port).
Swagger UI: http://localhost/swagger-ui.html

Optional demo data: see `database/sample_data.sql`.

More detail: [SETUP.md](SETUP.md), [docs/DEPLOYMENT_GUIDE.md](docs/DEPLOYMENT_GUIDE.md).

## Project structure

```
expense-tracker/
├── docker-compose.yml, nginx.conf, .env.example   (run everything)
├── backend/                  Spring Boot API
│   ├── pom.xml, Dockerfile
│   └── src/main/java/com/expensetracker/
│   │   ├── config/       CorsConfig, DatabaseConfig, SwaggerConfig
│   │   ├── controller/   ExpenseController, CategoryController, DashboardController
│   │   ├── service/      ExpenseService, DashboardService
│   │   ├── repository/   ExpenseRepository, ExpenseSpecification, CategoryTotal
│   │   ├── entity/       Expense, ExpenseCategory
│   │   ├── dto/          request/ExpenseRequest, response/*
│   │   ├── exception/    ExpenseNotFoundException, GlobalExceptionHandler, ApiErrorResponse
│   │   ├── mappers/      ExpenseMapper
│   │   └── util/         ConstantsUtil
│   ├── src/main/resources/ application*.properties, db/migration (Flyway V1-V3)
│   ├── src/test/           service, controller and integration tests (H2)
├── frontend/           React + TypeScript app (components, pages, services, hooks, context, utils, styles)
├── database/           schema + sample data
├── scripts/            setup.sh, deploy.sh, backup-database.sh, SQL helpers
└── docs/               architecture, schema, deployment, testing, security, troubleshooting
```

## Running tests

```bash
cd backend && mvn test            # backend (uses in-memory H2, no MySQL needed)
cd ../frontend && npm install && npm test
```
