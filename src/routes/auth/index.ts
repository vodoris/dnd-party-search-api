import { Router } from 'express';
import { loginRouter } from './login';

export function authRouter() {
    const router = Router();

    router.use('/login', loginRouter());

    return router;
}

