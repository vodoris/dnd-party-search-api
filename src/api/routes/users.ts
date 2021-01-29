import { Router } from 'express';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
	app.use('/users', route);

	route.get('/me', middlewares.isAuth, (req, res) => {
		res.status(200).json({ user: 'lol' });
	});
};
