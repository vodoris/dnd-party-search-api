import { Router } from 'express';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
	app.use('/users', route);

	route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req, res) => {
		const me = req.currentUser;
		res.status(200).json({ ...me });
	});
};