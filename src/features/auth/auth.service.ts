import { Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';

const jwt_secret = process.env.JWT_SECRET as string;

export const createToken = (user: Prisma.UserCreateInput) => {
    const payload = {
        id: user.id,
        email: user.email
    }

    if(!jwt_secret) {
        throw new Error("Ambient variable 'JWT_SECRET' needs to be defined.")
    }

    return jwt.sign(payload, jwt_secret, {
        expiresIn: '2h'
    })
}