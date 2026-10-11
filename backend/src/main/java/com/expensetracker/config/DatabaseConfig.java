package com.expensetracker.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 * Persistence configuration. The datasource itself is configured through
 * application-*.properties (Spring Boot auto-configuration); the schema is managed by Flyway.
 */
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.expensetracker.repository")
public class DatabaseConfig {
}
