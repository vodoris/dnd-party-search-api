export interface UserModel {
	id?: string;
	email?: string;
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
