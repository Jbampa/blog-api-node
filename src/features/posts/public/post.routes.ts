import { Router } from "express";
import { getAllPostsController } from "./post.controllers";

const publicPostRoutes = Router();

publicPostRoutes.get('/posts', getAllPostsController);
publicPostRoutes.get('/posts/:slug', getAllPostsController);


export default publicPostRoutes;