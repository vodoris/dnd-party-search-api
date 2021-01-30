import db from '../db';
import jwt from 'jsonwebtoken';
import config from '../config';
import { v4 as uuidv4 } from 'uuid';
import { compareHash, generateHash } from '../utils/passwords';
import { IPayload, UserModel } from '../interfaces';

export const registerUser = async (user: UserModel) => {
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

		// always good to do lol
		delete user.password;

		// generating JWT for our newly registered user
		const token = signToken({
			id: user.id,
			email: user.email,
			role_id: user.role_id,
			username: user.username
		});
		return { user, token };
	} catch (e) {
		throw e;
	}
};

export const loginUser = async (user: { email: string; password: string }) => {
	try {
		// check if email exists
		const [userRecord] = await db.users.find('email', user.email);
		if (!userRecord) {
			throw new Error('email or password incorrect');
		}

		const compared = await compareHash(user.password, userRecord.password);
		if (!compared) {
			throw new Error('email or password incorrect');
		}

		// always good to do lol
		delete userRecord.password;

		// generating JWT for our login
		const token = signToken({
			id: userRecord.id,
			email: userRecord.email,
			role_id: userRecord.role_id,
			username: userRecord.username
		});

		return { user: userRecord, token };
	} catch (e) {
		throw e;
	}
};

const signToken = (payload: IPayload) => {
	return jwt.sign(payload, config.jwt.secret, {
		expiresIn: config.jwt.expires
	});
};
