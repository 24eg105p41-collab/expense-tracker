# Build context is the repository root (see docker-compose.yml) so nginx.conf can be copied.
FROM node:22-alpine AS build
WORKDIR /app
COPY frontend/package.json ./
RUN npm install --no-audit --no-fund
COPY frontend/ ./
ARG VITE_CURRENCY=INR
ARG VITE_LOCALE=en-IN
ENV VITE_API_URL=/api VITE_CURRENCY=$VITE_CURRENCY VITE_LOCALE=$VITE_LOCALE
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK CMD wget -qO- http://localhost/ >/dev/null || exit 1
