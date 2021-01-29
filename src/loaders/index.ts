import dbLoader from './mysql';
import expressLoader from './express';

export default async ({ expressApp }) => {
	await dbLoader();
	console.log('✌️ db connected and loaded');
	
	await expressLoader({ app: expressApp });
	console.log('✌️ express loaded');
};
