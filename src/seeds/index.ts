import mysql from 'mysql';
import { v4 as uuidv4 } from 'uuid';
import config from '../config';
import logger from '../loaders/logger';

const connection = mysql.createConnection(config.mysql);

connection.connect();

connection.query('DROP TABLE IF EXISTS users;', (e, results) => {
	if (e) {
		logger.error('☠️ error: ', e);
		connection.end();
	} else {
		connection.query(
			`
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
        `,
			(e, results) => {
				if (e) {
					logger.error('☠️ error: ', e);
					connection.end();
				} else {
					connection.query(
						`
                    INSERT INTO users (id, email, password, username, first_name, last_name, role_id) VALUES
                    ('${uuidv4()}', 'player@test.com', '$2b$12$sZ.hZJkw.v0sOGBqeweiXuYPYx0EwcETEQmiLjJBiFMCI9lOZH1Dy', 'player_test', 'player', 'test', 1),
                    ('${uuidv4()}', 'dm@test.com', '$2b$12$sZ.hZJkw.v0sOGBqeweiXuYPYx0EwcETEQmiLjJBiFMCI9lOZH1Dy', 'dm_test', 'dm', 'test', 2),
                    ('${uuidv4()}', 'admin@test.com', '$2b$12$sZ.hZJkw.v0sOGBqeweiXuYPYx0EwcETEQmiLjJBiFMCI9lOZH1Dy', 'admin_test', 'admin', 'test', 9);
                    `,
						(e, results) => {
							if (e) {
								logger.error('☠️ error: ', e);
								connection.end();
							} else {
								logger.silly('Database Seeded');
								connection.end();
							}
						}
					);
				}
			}
		);
	}
});
