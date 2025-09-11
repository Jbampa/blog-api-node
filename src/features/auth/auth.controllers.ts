import { RequestHandler, response } from "express";
import { createUser } from "../users/user.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { createToken } from "./auth.service";

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
        res.status(500).json({
            error: "An internal server error occurred"
        })
    }
}

// export const authSigninController: RequestHandler = (req, res) => {
//     console.log('chegou');
//     res.status(200).json({
//         success: "true"
//     })
// }


// export const authValidateController: RequestHandler = (req, res) => {
//     console.log('chegou');
//     res.status(200).json({
//         success: "true"
//     })
// }