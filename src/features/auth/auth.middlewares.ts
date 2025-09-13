import { User } from "@prisma/client";
import { RequestHandler } from "express";
import passport from "passport";
import { ZodType } from "zod";
// import { verifyRequest } from "./auth.services";


export const authZodBodyMiddleware = (zod: ZodType): RequestHandler => async (req, res, next) => {
    try {
        const result = await zod.parse(req.body)

        return next();
    } catch (err) {
        return next(err);
    }
    
}

export const jwtStrategyAuth: RequestHandler = (req, res, next) => {
    const authStrategy = passport.authenticate('jwt', (err: any, response: Omit<User, "password"> | false) => {
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


// export const privateRoute: RequestHandler = async (req, res, next) => {
//     const user = await verifyRequest(req);

//     if(!user) {
//         return res.status(401).json({
//             error: "Access denied"
//         })
//     }

//     req.user = user;

//     next()
// }