import { Router } from "express";
import authRoutes from "../features/auth/auth.routes";

const routes = Router();

routes.get('/ping', (req, res) => {
    res.status(200).json({
        message: 'pong'
    });
});

routes.use('/auth', authRoutes);

export default routes;