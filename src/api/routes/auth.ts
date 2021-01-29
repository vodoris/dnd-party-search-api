import { Router, Request, Response, NextFunction } from 'express';
// import { IUserInputDTO } from '../../interfaces/IUser';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';

const route = Router();

export default (app: Router) => {
	app.use('/auth', route);

	route.post(
		'/register',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				password: Joi.string().required()
			})
		}),
		async (req: Request, res: Response, next: NextFunction) => {
			try {
				return res.status(201).json({ msg: 'test register' });
			} catch (e) {
				console.error('🔥 error: ', e);
				return next(e);
			}
		}
	);
};
