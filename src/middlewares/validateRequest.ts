import { RequestHandler } from "express";
import { ZodError, ZodType } from "zod";


export const authSignUpMiddleware = (zod: ZodType): RequestHandler => async (req, res, next) => {
    try {
        console.log("Chegou no middleware");
        const result = await zod.parse(req.body)

        return next();
    } catch (err) {
        if(err instanceof ZodError){
            res.status(400).json({
                err
            })
        }
        return next(err);
    }
    
}