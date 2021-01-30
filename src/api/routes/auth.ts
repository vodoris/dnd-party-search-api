import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi } from 'celebrate';
import { loginUser, registerUser } from '../../services/auth';
import logger from '../../loaders/logger';

const route = Router();

export default (app: Router) => {
	app.use('/auth', route);

	route.post(
		'/register',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				password: Joi.string().required(),
				role_id: Joi.number().required(),
				username: Joi.string().required(),
				first_name: Joi.string().required(),
				last_name: Joi.string().required(),
				avatar_url: Joi.string().optional()
			})
		}),
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const userDTO = req.body;
				const { user, token } = await registerUser(userDTO);
				return res.status(201).json({ msg: 'user registered', user, token });
			} catch (e) {
				logger.error('☠️ error: ', e);
				return next(e);
			}
		}
	);

	route.post(
		'/login',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				password: Joi.string().required()
			})
		}),
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				const userDTO = req.body;
				const { user, token } = await loginUser(userDTO);
				return res.status(200).json({ msg: 'user login successful', user, token });
			} catch (e) {
				logger.error('☠️ error: ', e);
				return next(e);
			}
		}
	);
};
