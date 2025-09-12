import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { findUserById } from "../users/user.service";
import { RequestHandler } from "express";
import passport from 'passport';
import { Prisma } from "@prisma/client";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}

export const strategy = new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await findUserById(payload.id);

        if(user) {
            return done(null, user)
        } else {
            return done(null, false);
        }
    } catch (err) {
        console.log("Strategy error:", err)
        return done(err, false);
    }
})

export const jwtStrategyAuth: RequestHandler = (req, res, next) => {
    const authStrategy = passport.authenticate('jwt', (err: any, response: Prisma.UserCreateInput | false) => {
        if(response) {
            req.user = response;
            return next()
        } else {
            return res.status(401).json({
                error: "Access denied!"
            })
        }
    })
    authStrategy(req, res, next);
}