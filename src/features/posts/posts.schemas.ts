import z from "zod"

export const postBodySchema = z.object({
    title: z.string(),
    tags: z.string(),
    body: z.string()
})

export const postUpdateBodySchema = z.object({
    title: z.string().optional(),
    tags: z.string().optional(),
    body: z.string().optional(),
    status: z.enum(['PUBLISHED', 'DRAFT']).optional(),
})