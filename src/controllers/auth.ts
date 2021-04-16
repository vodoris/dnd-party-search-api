import type { Request, Response, NextFunction } from 'express';

export function authController() {
	const login = (req: Request, res: Response, next: NextFunction) => {
		res.json('login');
	};

	return {
		login
	};
}
