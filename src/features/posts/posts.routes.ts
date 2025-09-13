import { Router } from 'express';
import { authZodBodyMiddleware, jwtStrategyAuth } from '../auth/auth.middlewares';
import { postBodySchema } from '../auth/auth.schemas';
import { upload } from '../../libs/multer';
import { addPostController } from './posts.controllers';

const postRoutes = Router();

postRoutes.post('/posts', jwtStrategyAuth, upload.single('cover'), authZodBodyMiddleware(postBodySchema), addPostController);


export default postRoutes;