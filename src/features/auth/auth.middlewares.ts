import { NextFunction, RequestHandler } from "express";
import { verify } from "jsonwebtoken";
import { ZodError, ZodType } from "zod";
import { verifyRequest } from "./auth.services";


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

export const privateRoute: RequestHandler = async (req, res, next) => {
    const user = await verifyRequest(req);

    if(!user) {
        res.status(401).json({
            error: "Access denied"
        })
    }

    req.user = user

    next()
}