import { Router } from 'express';
import { authSigninController, authSignupController, authValidateController } from './auth.controllers';
import { authZodBodyMiddleware, jwtStrategyAuth } from './auth.middlewares';
import { signinSchema, signupSchema } from './auth.schemas';
// import { privateRoute } from './auth.middlewares';

const authRoutes = Router();

authRoutes.post('/signup', authZodBodyMiddleware(signupSchema), authSignupController);
authRoutes.post('/signin', authZodBodyMiddleware(signinSchema), authSigninController);
authRoutes.post('/validate', jwtStrategyAuth, authValidateController);

export default authRoutes;