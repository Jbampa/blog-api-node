import { Router } from "express";
import authRoutes from "../features/auth/auth.routes";
import adminPostRoutes from "../features/posts/admin/posts.routes";
import publicPostRoutes from "../features/posts/public/post.routes";
 "../features/posts/admin/posts.routes";

const routes = Router();

routes.get('/ping', (req, res) => {
    res.status(200).json({
        message: 'pong'
    });
});

routes.use('/auth', authRoutes);
routes.use('/admin', adminPostRoutes);
routes.use('/', publicPostRoutes);

export default routes;