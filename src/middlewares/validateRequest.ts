import { RequestHandler } from "express";
import { ZodError, ZodType } from "zod";


export const authZodSignupMiddleware = (zod: ZodType): RequestHandler => async (req, res, next) => {
    try {
        const result = await zod.parse(req.body)

        return next();
    } catch (err) {
        return next(err);
    }
    
}

export const authZodSigninMiddleware = (zod: ZodType): RequestHandler => async (req, res, next) => {
    try {
        const result = await zod.parse(req.body)

        return next()
    } catch (err) {
        return next(err);
    }   
}