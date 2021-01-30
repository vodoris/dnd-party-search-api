import dbLoader from './mysql';
import expressLoader from './express';
import logger from './logger';

export default async ({ expressApp }) => {
	await dbLoader();
	logger.info('✌️ db connected and loaded');
	
	await expressLoader({ app: expressApp });
	logger.info('✌️ express loaded');
};
