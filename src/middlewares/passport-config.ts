import passport from 'passport';
import config from '../config';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import type { Application } from 'express';

export function configurePassport(app: Application) {

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));

    passport.use(new LocalStrategy({}, async (email, password, done) => {
        try {
            done(null, { id: 1, email: 'derp', username: 'herp' })
        } catch (error) {
            done(error);
        }
    }));

    passport.use(new JWTStrategy({
        secretOrKey: config.jwt.secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, (payload, done) => {
        try {
            done(payload);
        } catch (error) {
            done(error);
        }
    }));

    app.use(passport.initialize());
}