# Database schema

Table `expenses`

| Column | Type | Notes |
|---|---|---|
| id | BIGINT PK AUTO_INCREMENT | |
| title | VARCHAR(120) NOT NULL | |
| amount | DECIMAL(12,2) NOT NULL | `CHECK (amount > 0)` |
| category | VARCHAR(30) NOT NULL | enum name, e.g. `FOOD` |
| expense_date | DATE NOT NULL | |
| description | VARCHAR(500) NULL | |
| created_at / updated_at | DATETIME(6) | set by JPA lifecycle callbacks |

Indexes: `expense_date`, `category`, `title`.

Migrations (Flyway, run automatically at startup): `V1__init_schema.sql`, `V2__add_indexes.sql`,
`V3__add_constraints.sql`. Never edit an applied migration; add a new `V4__...` file instead.
Hibernate runs with `ddl-auto=none`, so Flyway is the single owner of the schema.
