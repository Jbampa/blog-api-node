import { Prisma, User } from "@prisma/client"
import { prisma } from "../../libs/prisma"
import { encryptPassword } from "./user.utils";
import { compare } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import { createToken } from "../auth/auth.services";



export const createUser = async (user: Prisma.UserCreateInput) => {
    const encryptedPassword = await encryptPassword(user.password);

    const result = await prisma.user.create({
        data: {
            ...user,
            email: user.email.toLowerCase(), 
            password: encryptedPassword 
        }
    }); 

    return result;
}

export const findUserById = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            email: true,
            status: true
        }
    })

    return result;
}

export const findUser = async (email: string) => {
    const result = prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    return result;
}

export const authenticateUser = async (email: string, password: string) => {
    const user: User | null = await findUser(email);

    const isPasswordCorrect = user ? await compare(password, user.password): false;

    if(!user || !isPasswordCorrect) {
        throw new AppError('Invalid email or password.', 401);
    }

    const jwtToken = createToken(user);

    return {
        user, 
        token: jwtToken
    }
}
