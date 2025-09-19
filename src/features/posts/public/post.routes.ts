import { Router } from "express";
import { getAllPostsController } from "./post.controllers";

const publicPostRoutes = Router();

publicPostRoutes.get('/posts', getAllPostsController);

export default publicPostRoutes;