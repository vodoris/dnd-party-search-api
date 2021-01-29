CREATE SCHEMA IF NOT EXISTS dnd_search_party;

USE dnd_search_party;

CREATE TABLE users (
    id VARCHAR(60) NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id)
);