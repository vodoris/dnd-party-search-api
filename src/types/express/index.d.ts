import { UserModel } from '../../interfaces';

declare global {
  namespace Express {
    export interface Request {
      currentUser: UserModel;
    }    
  }
}