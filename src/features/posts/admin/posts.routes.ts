import { Router } from 'express';
import { authZodBodyMiddleware, jwtStrategyAuth } from '../../auth/auth.middlewares';
import { postBodySchema, postUpdateBodySchema } from '../posts.schemas';
import { upload } from '../../../libs/multer';
import { addPostController, getPostBySlugController, updatePostController, deletePostBySlugController, getAllPostsAndDraftsController } from './posts.controllers';

const adminPostRoutes = Router();

adminPostRoutes.post('/posts', jwtStrategyAuth, upload.single('cover'), authZodBodyMiddleware(postBodySchema), addPostController);
adminPostRoutes.put('/posts/:slug', jwtStrategyAuth, upload.single('cover'), authZodBodyMiddleware(postUpdateBodySchema), updatePostController);
adminPostRoutes.get('/posts/:slug', jwtStrategyAuth, getPostBySlugController);
adminPostRoutes.get('/posts', jwtStrategyAuth, getAllPostsAndDraftsController)
adminPostRoutes.delete('/posts/:slug', jwtStrategyAuth, deletePostBySlugController);



export default adminPostRoutes;