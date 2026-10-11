# API documentation

Base URL: `/api` (interactive docs at `/swagger-ui.html`, OpenAPI JSON at `/v3/api-docs`).

## Expenses

| Method | Path | Description |
|---|---|---|
| GET | `/api/expenses` | Paged list with search, filters and sorting |
| GET | `/api/expenses/{id}` | One expense |
| POST | `/api/expenses` | Create (returns 201) |
| PUT | `/api/expenses/{id}` | Update |
| DELETE | `/api/expenses/{id}` | Delete (returns 204) |

### GET /api/expenses query parameters

| Param | Default | Notes |
|---|---|---|
| `q` | - | Matches title, description or category (code/label), case-insensitive |
| `category` | - | One of the category codes below |
| `from`, `to` | - | `yyyy-MM-dd`, inclusive |
| `page`, `size` | `0`, `10` | `size` is capped at 100 |
| `sortBy` | `expenseDate` | `expenseDate`, `amount`, `title`, `category`, `createdAt` |
| `direction` | `desc` | `asc` or `desc` |

### Request body (POST / PUT)

```json
{
  "title": "Grocery shopping",
  "amount": 2350.75,
  "category": "FOOD",
  "expenseDate": "2026-10-11",
  "description": "optional, max 500 chars"
}
```

Rules: title required (max 120), amount 0.01 - 9,999,999,999.99 with up to 2 decimals, category required, date required.

### Response

```json
{
  "id": 1, "title": "Grocery shopping", "amount": 2350.75,
  "category": "FOOD", "categoryLabel": "Food & Dining",
  "expenseDate": "2026-10-11", "description": null,
  "createdAt": "2026-10-11T10:15:30.123456", "updatedAt": "2026-10-11T10:15:30.123456"
}
```

## Categories

`GET /api/categories` -> `[{ "value": "FOOD", "label": "Food & Dining" }, ...]`

Codes: `FOOD, TRANSPORT, HOUSING, UTILITIES, HEALTH, ENTERTAINMENT, SHOPPING, EDUCATION, TRAVEL, OTHER`

## Dashboard

`GET /api/dashboard` -> totals, `currentMonthTotal`, `previousMonthTotal`, `averageExpense`, `topCategory`,
`categoryBreakdown[]`, `monthlyTrend[]` (last 6 months) and `recentExpenses[]` (5 newest).

## Errors

```json
{
  "timestamp": "2026-10-11T10:15:30Z", "status": 400, "error": "Bad Request",
  "message": "Validation failed", "path": "/api/expenses",
  "fieldErrors": { "title": "Title is required" }
}
```

Statuses used: 400 (validation / bad parameter), 404 (unknown expense or route), 500 (unexpected).
