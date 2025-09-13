import z from "zod";

export const signupSchema = z.object({
    name: z.string({error: "Name is required"}).min(3, {error: "Name must be at least 3 characters long."}),
    email: z.email({error: "Email is required"}),
    password: z.string({error: "Password is required"})
});

export const signinSchema = z.object({
    email: z.email({error: "Email is required"}),
    password: z.string({error: "Password is required"})
})

export const postBodySchema = z.object({
    title: z.string(),
    tags: z.string(),
    body: z.string()
})