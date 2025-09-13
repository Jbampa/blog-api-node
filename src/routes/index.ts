import { Router } from "express";
import authRoutes from "../features/auth/auth.routes";
import postRoutes from "../features/posts/posts.routes";

const routes = Router();

routes.get('/ping', (req, res) => {
    res.status(200).json({
        message: 'pong'
    });
});

routes.use('/auth', authRoutes);
routes.use('/admin', postRoutes);

export default routes;