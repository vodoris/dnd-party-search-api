import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import { IError } from '../interfaces';

export default async ({ app }: { app: express.Application }) => {
	// health checkpoints
	app.get('/status', (req, res) => res.status(200).end());
	app.head('/status', (req, res) => res.status(200).end());

	// shows the real origin IP in the heroku
	app.enable('trust proxy');
	app.use(cors());
	app.use(express.json());
	app.use(config.api.prefix, routes());

	/// catch 404 and forward to error handler
	app.use((req, res, next) => {
		const err = new Error('Not Found');
		err['status'] = 404;
		next(err);
	});

	// error handlers
	app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
		// handle 401 errors thrown by express-jwt
		if (err.name === 'UnauthorizedError') {
			return res.status(err.status).send({ message: err.message }).end();
		}
		return next(err);
	});
	app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
		res.status(err.status || 500);
		res.json({
			errors: {
				message: err.message
			}
		});
	});
};
