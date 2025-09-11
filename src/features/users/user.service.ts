import { Prisma } from "@prisma/client"
import { prisma } from "../../libs/prisma"
import { encryptPassword } from "./user.utils";



export const createUser = async (user: Prisma.UserCreateInput) => {
    const encryptedPassword = await encryptPassword(user.password);

    const result = await prisma.user.create({
        data: {
            ...user, 
            password: encryptedPassword 
        }
    }); 

    return result;
}

export const findUserById = async (id: number) => {
    const result = prisma.user.findUnique({
        where: {
            id: id
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