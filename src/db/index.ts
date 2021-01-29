import mysql from 'mysql';
import { get } from '../loaders/mysql';

export const Query = <T = any>(query: string, values?: any) => {
	const sql = mysql.format(query, values);
	console.log('executing query\n' + sql);

	return new Promise<T>((resolve, reject) => {
		get().query(sql, (err, results) => {
			if (err) {
				reject(err);
			} else {
				resolve(results);
			}
		});
	});
};

import users from './queries/users';
export default {
	users
}