import { Router } from 'express';
import { authSigninController, authSignupController, authValidateController } from './auth.controllers';
import { authZodSigninMiddleware, authZodSignupMiddleware } from './auth.middlewares';
import { signinSchema, signupSchema } from './auth.schemas';
import { jwtStrategyAuth } from './auth.passport.strategy';
// import { privateRoute } from './auth.middlewares';

const authRoutes = Router();

authRoutes.post('/signup', authZodSignupMiddleware(signupSchema), authSignupController);
authRoutes.post('/signin', authZodSigninMiddleware(signinSchema), authSigninController);
authRoutes.post('/validate', jwtStrategyAuth, authValidateController);

// authRoutes.get('/validate', authValidateController);


export default authRoutes;