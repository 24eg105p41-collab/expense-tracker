# Security notes

- **There is no authentication in this version** (the abstract lists JWT as future work). Anyone who can reach the site
  can read and change all expenses. Do not expose it publicly with real data without adding authentication or restricting
  access (VPN, firewall, nginx basic auth).
- Input is validated server-side (Bean Validation); SQL is parameterised through JPA; LIKE wildcards in search input are escaped.
- Sort fields are whitelisted; page size is capped.
- Stack traces and internal messages are not returned to clients (`GlobalExceptionHandler`, prod `server.error.*`).
- The backend container runs as a non-root user. Only nginx is published; MySQL and the API are reachable only inside the Docker network.
- Use strong values in `.env` (`setup.sh` generates random ones) and never commit `.env`.
- Set `SWAGGER_ENABLED=false` if you do not want the API docs public.
