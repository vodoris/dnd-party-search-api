import { IUser } from '../../interfaces';

declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser;
    }    
  }
}