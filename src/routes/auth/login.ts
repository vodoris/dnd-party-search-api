import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import { authController } from '../../controllers';

export function loginRouter() {
	const router = Router();

	router.post(
		'/',
		celebrate({
			body: Joi.object({
				email: Joi.string().required(),
				password: Joi.string().required()
			})
		}),
		authController().login
	);

	return router;
}
