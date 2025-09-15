import { v4 } from "uuid";
import fs from 'fs/promises';
import slug from "slug";
import { prisma } from "../../libs/prisma";
import { Prisma } from "@prisma/client";
import { includes } from "zod";
import { rename } from "fs";

export const findPostBySlug = async (slug: string) => {
    const post = prisma.post.findUnique({
        where: { slug: slug },
        include: {
            author: {
                select: {
                    name: true
                }
            }
        }
    })

    return post;
}

export const handleCover = async (file: Express.Multer.File ) => {
    const mimeToExt: Record<string, string> = {
        "image/jpeg": "jpg",
        "image/jpg": "png",
        "image/png": "png"
    }

    const imageTypesAllowed = ["image/jpeg", "image/jpg", "image/png"];

    if(imageTypesAllowed.includes(file.mimetype)) {
        const ext = mimeToExt[file.mimetype];
        const coverName = `${v4()}.${ext}`;

        try {
            await fs.rename(file.path, `./public/images/covers/${coverName}`);
            return coverName;
        } catch (err) {
            return false;
        }
    }

    return false;
}

export const createSlug = async (title: string) => {
    let newSlug = slug(title);
    let keepTrying = true;
    let postCount = 1;

    while(keepTrying){
        const post = await findPostBySlug(newSlug);
        if(!post) {
            keepTrying = false;
        } else {
            newSlug = slug(`${title} ${++postCount}`);
        }
    }

    return newSlug;
}

type CreatePostProps = {
    authorId: number,
    slug: string,
    title: string,
    tags: string, 
    body: string,
    cover: string
}

export const createPost = async (post: CreatePostProps) => {
    return await prisma.post.create({ data: post });
}

export const updatePost = async (slug: string, data: Prisma.PostUpdateInput) => {
    const result = await prisma.post.update({
        where: { slug },
        data
    })

    return result;
}