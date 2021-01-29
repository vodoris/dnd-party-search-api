import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (envFound.error) {
	// This error should crash whole process
	throw new Error('⚠️  .env file not found  ⚠️');
}

export default {
	port: parseInt(process.env.PORT, 10),
	jwt: {
		secret: process.env.JWT_SECRET,
		expires: process.env.JWT_EXPIRE,
		algorithm: process.env.JWT_ALGO
	},
	logs: {
		level: process.env.LOG_LEVEL
	},
	api: {
		prefix: '/api'
	},
	mysql: {
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_SCHEMA
	}
};
