import { RequestHandler } from "express";
import { getAllPublishedPosts } from "../posts.services";
import { coverToUrl } from "../../../utils/cover-to-url";

export const getAllPostsController: RequestHandler = async (req, res) => {
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
}