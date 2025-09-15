import { Router } from 'express';
import { authZodBodyMiddleware, jwtStrategyAuth } from '../auth/auth.middlewares';
import { postBodySchema, postUpdateBodySchema } from '../posts/posts.schemas';
import { upload } from '../../libs/multer';
import { addPostController, updatePostController } from './posts.controllers';

const postRoutes = Router();

postRoutes.post('/posts', jwtStrategyAuth, upload.single('cover'), authZodBodyMiddleware(postBodySchema), addPostController);
postRoutes.put('/posts/:slug', jwtStrategyAuth, upload.single('cover'), authZodBodyMiddleware(postUpdateBodySchema), updatePostController);

export default postRoutes;