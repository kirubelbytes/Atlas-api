import { Router } from 'express';
import { catchAsync } from '../utils/catchAsync.js';
import { signUp, verifyEmail } from '../controllers/auth.controller.js';

const authRouter = Router();
authRouter.post('/signup', catchAsync(signUp));
authRouter.post('/verify-email', catchAsync(verifyEmail));

export default authRouter;
