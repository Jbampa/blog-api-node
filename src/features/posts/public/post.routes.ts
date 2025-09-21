import { Router } from "express";
import { getAllPostsController } from "./post.controllers";
import { getRelatedPostsController } from "../admin/posts.controllers";

const publicPostRoutes = Router();

publicPostRoutes.get('/posts', getAllPostsController);
publicPostRoutes.get('/posts/:slug', getAllPostsController);
publicPostRoutes.get('/posts/:slug/related', getRelatedPostsController);


export default publicPostRoutes;