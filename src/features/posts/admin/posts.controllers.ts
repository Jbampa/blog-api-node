import { RequestHandler } from "express";
import { createPost, createSlug, deletePost, findPostBySlug, getAllPosts, getPostWithSameTags, handleCover, updatePost } from "../posts.services";
import { findUserById } from "../../users/user.service";
import { coverToUrl } from "../../../utils/cover-to-url";

export const addPostController: RequestHandler = async (req, res, next) => {
    try {
        if (!(req.user as any).id) return;

        if (!req.file) {
            return res.status(400).json({
                error: "File not received."
            });
        }

        const coverName = await handleCover(req.file);

        if (!coverName) {
            return res.status(500).json({
                error: "Image upload error - File not accepted."
            });
        }

        const slug = await createSlug(req.body.title);

        const newPost = await createPost({
            authorId: (req.user as any).id,
            title: req.body.title,
            slug,
            tags: req.body.tags,
            body: req.body.body,
            cover: coverName
        });

        const author = await findUserById(newPost.authorId);

        return res.status(201).json({
            id: newPost.id,
            slug: newPost.slug,
            title: newPost.title,
            createdAt: newPost.createdAt,
            cover: coverToUrl(newPost.cover),
            tags: newPost.tags,
            authorName: author?.name
        });
    } catch (error) {
        return next(error);
    }
};

export const updatePostController: RequestHandler = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const post = await findPostBySlug(slug);

        if (!post) {
            return res.status(404).json({
                error: "Post doesn't exist."
            });
        }

        let coverName: string | false = false;

        if (req.file) {
            coverName = await handleCover(req.file);
        }

        const updatedPost = await updatePost(slug, {
            updatedAt: new Date(),
            title: req.body.title ?? undefined,
            body: req.body.body ?? undefined,
            status: req.body.status ?? undefined,
            tags: req.body.tags ?? undefined,
            cover: coverName ? coverName : undefined
        });

        const author = post.author?.name;

        return res.status(200).json({
            id: updatedPost.id,
            status: updatedPost.status,
            slug: updatedPost.slug,
            title: updatedPost.title,
            createdAt: updatedPost.createdAt,
            cover: coverToUrl(updatedPost.cover),
            author: author
        });
    } catch (error) {
        return next(error);
    }
};

export const getPostBySlugController: RequestHandler = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const post = await findPostBySlug(slug);

        if (!post) {
            return res.status(404).json({
                error: "Post doesn't exist."
            });
        }

        return res.status(200).json({
            id: post.id,
            status: post.status,
            createdAt: post.createdAt,
            cover: coverToUrl(post.cover),
            authorName: post.author?.name,
            tags: post.tags,
            body: post.body,
            slug: post.slug
        });
    } catch (error) {
        return next(error);
    }
};

export const deletePostBySlugController: RequestHandler = async (req, res, next) => {
    try {
        const { slug } = req.params;
        await deletePost(slug);

        return res.status(204).json({});
    } catch (error) {
        return next(error);
    }
};

export const getAllPostsAndDraftsController: RequestHandler = async (req, res, next) => {
    try {
        let page = 1;

        if (req.query.page) {
            page = parseInt(req.query.page as string);

            if (page <= 0) {
                return res.status(400).json({
                    error: "Page number must be 1 or higher."
                });
            }
        }

        const posts = await getAllPosts(page);

        const postsToReturn = posts.map(post => ({
            id: post.id,
            title: post.title,
            createdAt: post.createdAt,
            cover: coverToUrl(post.cover),
            authorName: post.author,
            tags: post.tags,
            slug: post.slug
        }));

        return res.status(200).json({
            postsToReturn,
            page
        });
    } catch (error) {
        return next(error);
    }
};
