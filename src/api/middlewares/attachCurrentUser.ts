import { RequestHandler } from 'express';
import db from '../../db';

const attachCurrentUser: RequestHandler = async (req, res, next) => {
	try {
		const userid = req.token.id;
		const [userRecord] = await db.users.one(userid);

		if (!userRecord) {
			return res.sendStatus(401);
		}

		delete userRecord.password;

		req.currentUser = userRecord;

		return next();
	} catch (e) {
		console.error(e);
		return next(e);
	}
};

export default attachCurrentUser;
