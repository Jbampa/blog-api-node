import { User } from "@prisma/client";
import { createJWT, readToken } from "../../libs/jwt";
import { Request, RequestHandler } from "express";
import { TokenPayload } from "../../types/tokenPayload";
import { findUserById } from "../users/user.service";

export const createToken = (user: User) => {
    return createJWT(user);
}

export const verifyRequest = async (req: Request) => {
    const { authorization } =  req.headers

    if(authorization) {
        const authSplit = authorization.split('Bearer ');
        
        if(authSplit[1]) {
            const payload = readToken(authSplit[1]);
            if(payload){
                const userId = (payload as TokenPayload).id;
                const user = await findUserById(userId);
                if(user) return user;
            }
        }
    }

    return false;
}