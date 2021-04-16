import { logger } from '../utils';
import type { Request, Response, NextFunction } from 'express';
import type { HTTPError } from '../types';

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
	const error: HTTPError = new Error(`path ${req.url} not found`);
	error.status = 404;
	next(error);
}

export function globalErrorHandler(
	error: HTTPError,
	req: Request,
	res: Response,
	next: NextFunction
) {
	logger.error('☠️ ' + error.message);
	res.status(error.status || 500);
	res.json({ error: error.message });
}
