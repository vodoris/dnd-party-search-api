import { RequestHandler } from 'express';

const attachCurrentUser: RequestHandler = (req, res, next) => {
	try {
		return next();
	} catch (e) {
		console.error(e);
		return next(e);
	}
};

export default attachCurrentUser;
