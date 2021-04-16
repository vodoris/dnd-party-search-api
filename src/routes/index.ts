import { Router } from 'express';
import { apiRouter } from './api';
import { authRouter } from './auth';

export function routes() {
	const router = Router();

	router.use('/api', apiRouter());
	router.use('/auth', authRouter());

	return router;
}
