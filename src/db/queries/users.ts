import { Query } from '../';
import type { UserModel, DBResponse } from '../../interfaces';

const all = () => Query<UserModel[]>(`SELECT * FROM users`);

const one = (id: string) => Query<UserModel[]>(`SELECT * FROM users WHERE id = ?;`, [id]);

const insert = (user: UserModel) => Query<DBResponse>(`INSERT INTO users SET ?;`, user);

const update = (user: UserModel, userid: number) =>
	Query<DBResponse>(`UPDATE users SET ? WHERE id = ?;`, [user, userid]);

const destroy = (id: number) => Query<DBResponse>(`DELETE FROM users WHERE id = ?;`, [id]);

const find = (column: string, value: string | number) =>
	Query<UserModel[]>(`SELECT * FROM users WHERE ?? = ?;`, [column, value]);

const search = (column: string, value: string | number) =>
	Query<UserModel[]>(`SELECT * FROM users WHERE ?? LIKE ?;`, [column, `%${value}%`]);

export default {
	all,
	one,
	insert,
	update,
	destroy,
	find,
	search
};
