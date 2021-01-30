CREATE SCHEMA IF NOT EXISTS dnd_party_search;

USE dnd_party_search;

CREATE TABLE roles (
    id INT NOT NULL,
    role VARCHAR(6),
    PRIMARY KEY (id)
);

INSERT INTO roles (id, role)
VALUES (1, 'player'),
    (2, 'dm'),
    (9, 'admin');

CREATE TABLE users (
    id VARCHAR(60) NOT NULL,
    email VARCHAR(60) UNIQUE NOT NULL,
    username VARCHAR(60) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
    avatar_url VARCHAR(300) DEFAULT 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png',
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles (id)
);