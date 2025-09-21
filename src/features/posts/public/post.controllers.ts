import { RequestHandler } from "express";
import { findPublishedPostBySlug, getAllPublishedPosts, getPostWithSameTags } from "../posts.services";
import { coverToUrl } from "../../../utils/cover-to-url";

export const getAllPostsController: RequestHandler = async (req, res, next) => {

    try {
        let page = 1;

        if(req.params.page) {
            page = parseInt(req.params.page as string);

            if(page <= 0) {
                return res.status(400).json({
                    error: "Page number must be 1 or higher."
                })
            }
        }

        const posts = await getAllPublishedPosts(page);

        const postsToReturn = posts.map(post => ({
            id: post.id,
            title: post.title,
            createdAt: post.createdAt,
            cover: coverToUrl(post.cover),
            authorName: post.author,
            tags: post.tags,
            slug: post.slug
        }))

        res.status(200).json({
            postsToReturn,
            page
        })
    } catch (err) {
        next(err);
    }
    
}

export const getPublishedPostBySlugController: RequestHandler = async (req, res, next) => {
    try {       
        const slug = req.params.slug;

        const post = await findPublishedPostBySlug(slug);

        if(!post) {
            return res.status(404).json({
                error: "Post doesn´t exist."
            })
        
        }

        res.status(200).json({
            id: post.id,
            status: post.status,
            createdAt: post.createdAt,
            cover: coverToUrl(post.cover),
            authorName: post.author?.name,
            tags: post.tags,
            body: post.body,
            slug: post.slug
        })
    } catch (err) {
        next(err);
    }

}

export const getRelatedPostsController: RequestHandler = async (req, res, next) => {
    try {
        const {slug} = req.params;

        const posts = await getPostWithSameTags(slug);

        if(posts.length === 0) {
            return res.status(200).json({
                error: "No posts found."
            })
        }

        const postsToReturn = posts.map(post => ({
            id: post.id,
            title: post.title,
            createdAt: post.createdAt,
            cover: coverToUrl(post.cover),
            authorName: post.author,
            tags: post.tags,
            slug: post.slug
        }));

        res.status(200).json({
            postsToReturn
        })

    } catch (error) {
        return next(error)
    }
}