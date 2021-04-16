import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import config from './config';
import { routes } from './routes';
import { logger, stream } from './utils';
import { globalErrorHandler, notFoundHandler, configurePassport } from './middlewares';
import { errors as celebrateErrorHandler } from 'celebrate';

function startServer() {
	const app = express();

	// health checkpoints
	app.get('/status', (req, res) => res.status(200).end());
	app.head('/status', (req, res) => res.status(200).end());

	configurePassport(app);
	app.use(cors());
	app.use(compression());
	app.use(helmet());
	app.use(morgan(config.logs.morgan, { stream }));
	app.use(express.json());
	app.use(routes());
	app.use(celebrateErrorHandler());
	app.use(notFoundHandler);
	app.use(globalErrorHandler);

	app.listen(config.app.port, () =>
		logger.info(`★ Server listening on port: ${config.app.port} ★`)
	).on('error', error => {
		logger.error('☠️' + error.message);
		process.exit(1);
	});
}

startServer();
