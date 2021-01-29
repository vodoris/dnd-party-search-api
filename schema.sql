CREATE SCHEMA IF NOT EXISTS dnd_search_party;

USE dnd_search_party;

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    role VARCHAR(10),
    PRIMARY KEY (id)
);

INSERT INTO roles (role) VALUES ('player'), ('dm'), ('admin');

CREATE TABLE users (
    id VARCHAR(60) NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles (id)
);
