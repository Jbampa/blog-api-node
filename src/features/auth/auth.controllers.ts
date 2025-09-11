import { RequestHandler, response } from "express";
import { createUser, findUser } from "../users/user.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createToken } from "./auth.service";
import { encryptPassword } from "../users/user.utils";
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

        const user = await findUser(email);

        if(!user){
            throw new AppError('User not found', 404);
        }

        const isPasswordCorrect = await compare(password, user.password)

        if(!isPasswordCorrect) {
            throw new AppError('Incorrect password', 401);
        }

        const jwtToken = await createToken(user);

        const response = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token: jwtToken
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


// export const authValidateController: RequestHandler = (req, res) => {
//     console.log('chegou');
//     res.status(200).json({
//         success: "true"
//     })
// }