import { hashSync } from "bcryptjs"

export const encryptPassword = async (password: string) => {
    const hashPassword = await hashSync(password) 
    return hashPassword;
}