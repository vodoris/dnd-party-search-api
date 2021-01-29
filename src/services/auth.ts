import db from '../db';
import jwt from 'jsonwebtoken';
import config from '../config';
import { v4 as uuidv4 } from 'uuid';
import { generateHash } from '../utils/passwords';

export const registerUser = async (user: {
	id?: string;
	email: string;
	role: number;
	password: string;
}) => {
	try {
		// check if email already registered
		const [emailFound] = await db.users.find('email', user.email);
		if (emailFound) {
			throw new Error('email already registered');
		}

		// adding id and salted/hashed property to user record
		user.id = uuidv4();
		user.password = await generateHash(user.password);

		// inserting new user
		await db.users.insert(user);

		// deleting properties for the JWT payload
		delete user.password;

		// generating JWT for our newly registered user
		const token = jwt.sign(user, config.jwt.secret, { expiresIn: config.jwt.expires });
		return { user, token };
	} catch (e) {
		console.error(e);
		throw e;
	}
};

export const loginUser = async (user: { email: string; password: string }) => {
	try {
		// check if email exists
		const [userRecord] = await db.users.find('email', user.email);
		if (!userRecord) {
			throw new Error('email not found');
		}

		// deleting properties for the JWT payload
		delete userRecord.password;

		// generating JWT for our login
		const token = jwt.sign({ ...userRecord }, config.jwt.secret, {
			expiresIn: config.jwt.expires
		});

		return { user: userRecord, token };
	} catch (e) {
		console.error(e);
		throw e;
	}
};
