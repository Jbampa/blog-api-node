import { Router } from "express";

const routes = Router();

routes.get('/ping', (req, res) => {
    res.status(200).json({
        message: 'pong'
    })
})


export default routes;

