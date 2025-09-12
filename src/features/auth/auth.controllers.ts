import { RequestHandler, response } from "express";
import { authenticateUser, createUser, findUser } from "../users/user.service";
import { createToken } from "./auth.services";
import { compare } from "bcryptjs";
import { AppError } from "../../errors/AppError";

export const authSignupController: RequestHandler = async (req, res) => {
    try {
        const user = await createUser(req.body);
        const jwtToken = createToken(user);

        const response = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token: jwtToken
        }

        res.status(201).json({
            response
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "An internal server error occurred"
        })
    }
}

export const authSigninController: RequestHandler = async (req, res) => {
    try {
        const {email, password} =  req.body;

        const AuthUser = await authenticateUser(email, password);

        const response = {
            user: {
                id: AuthUser.user.id,
                name: AuthUser.user.name,
                email: AuthUser.user.email
            },
            token: AuthUser.token
        }

        res.status(200).json({
            response
        })

    } catch (err) {
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                error: err.message
            })
        } 
        
        res.status(500).json({
            error: "An internal server error occurred"
        })
    }

}


export const authValidateController: RequestHandler = (req, res) => {
    res.status(200).json({
        user: req.user
    })
}