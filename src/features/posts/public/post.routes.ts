import { Router } from "express";
import { getAllPostsController, getPublishedPostBySlugController } from "./post.controllers";
import { getRelatedPostsController } from "./post.controllers";

const publicPostRoutes = Router();

publicPostRoutes.get('/posts', getAllPostsController);
publicPostRoutes.get('/posts/:slug', getPublishedPostBySlugController);
publicPostRoutes.get('/posts/:slug/related', getRelatedPostsController);


export default publicPostRoutes;