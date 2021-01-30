export interface UserModel {
	id?: string;
	email?: string;
	username?: string;
	first_name?: string;
	last_name?: string;
	avatar_url?: string;
	role_id?: number;
	password?: string;
	created_at?: Date;
}

export interface DBResponse {
	fieldCount: number;
	affectedRows: number;
	insertId: number;
	serverStatus: number;
	warningCount: number;
	message: string;
	protocol41: boolean;
	changedRows: number;
}

export interface IError {
	name?: string;
	status?: number;
	message: string;
}

export interface IPayload {
	id: string;
	email: string;
	role_id: number;
	username: string;
	created_at?: Date;
	iat?: number;
	exp?: number;
}
