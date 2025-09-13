import { User } from "@prisma/client";

type UserWithoutPassword = Omit<User, "Password">

export type ExtendedRequest = Request & {
    user?: UserWithoutPassword
}