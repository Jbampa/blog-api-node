import { Router } from 'express';
import { authSignupController } from './auth.controllers';
import { authSignUpMiddleware } from '../../middlewares/validateRequest';
import { signupSchema } from './auth.schemas';

const authRoutes = Router();

authRoutes.post('/signup', authSignUpMiddleware(signupSchema), authSignupController);
// authRoutes.post('/signin', authSigninController);
// authRoutes.post('/validate', authValidateController);

// authRoutes.get('/validate', authValidateController);


export default authRoutes;