-- This script will be executed automatically by Spring Boot if spring.jpa.hibernate.ddl-auto is not 'none'.
-- For a production environment, it's better to manage schema with tools like Flyway or Liquibase.

-- Insert initial users (lawyers)
-- Passwords are encrypted with BCrypt ("password123")
INSERT INTO users (username, password, full_name)
VALUES ('advogado1', '$2a$10$3Z.dY5b.s3.1v.C/eJ8b5u.wL3qO/j.V.jB/gUf.d.a.Q.a.Q.a.Q', 'Dr. João da Silva')
ON CONFLICT (username) DO NOTHING;

INSERT INTO users (username, password, full_name)
VALUES ('advogado2', '$2a$10$3Z.dY5b.s3.1v.C/eJ8b5u.wL3qO/j.V.jB/gUf.d.a.Q.a.Q.a.Q', 'Dra. Maria Oliveira')
ON CONFLICT (username) DO NOTHING;
