# Contributing

1. Create a branch, keep changes small and focused.
2. Backend: follow the controller -> service -> repository layering; add/adjust tests; `mvn test` must pass.
3. Frontend: `npm run typecheck` and `npm test` must pass.
4. Schema changes go in a new Flyway migration (`V4__...`), never in an existing one.
