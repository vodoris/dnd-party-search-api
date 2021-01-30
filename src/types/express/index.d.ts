import { IPayload, UserModel } from '../../interfaces';

declare global {
	namespace Express {
		export interface Request {
			currentUser: UserModel;
			token: IPayload;
		}
	}
}
