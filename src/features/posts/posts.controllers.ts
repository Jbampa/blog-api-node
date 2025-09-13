import { RequestHandler } from "express";
import { createPost, createSlug, handleCover } from "./posts.services";
import { User } from "@prisma/client";
import { findUserById } from "../users/user.service";


export const addPostController: RequestHandler = async (req, res) => {

    if(!(req.user as any).id ) return;

    if(!req.file) {
        return res.status(500).json({
            error: "File not received."
        })
    }

    const coverName = await handleCover(req.file)

    if(!coverName) {
        return res.status(500).json({
            error: "Image upload error - File not accepted."
        })
    }

    const slug = await createSlug(req.body.title);

    const newPost = await createPost({
        authorId: (req.user as any).id,
        title: req.body.title,
        slug,
        tags: req.body.tags,
        body: req.body.body,
        cover: coverName
    })

    const author = await findUserById(newPost.authorId);



    res.status(201).json({
        id: newPost.id,
        slug: newPost.slug,
        title: newPost.title,
        createdAt: newPost.createdAt,
        cover: newPost.cover,
        tags: newPost.tags,
        authorName: author?.name
    })
}