import { Router } from 'express';
import { authSigninController, authSignupController } from './auth.controllers';
import { authZodSigninMiddleware, authZodSignupMiddleware } from '../../middlewares/validateRequest';
import { signinSchema, signupSchema } from './auth.schemas';
import { jwtStrategyAuth } from './auth.passport.strategy';

const authRoutes = Router();

authRoutes.post('/signup', authZodSignupMiddleware(signupSchema), authSignupController);
authRoutes.post('/signin', authZodSigninMiddleware(signinSchema), authSigninController);
// authRoutes.post('/validate', authValidateController);

// authRoutes.get('/validate', authValidateController);


export default authRoutes;