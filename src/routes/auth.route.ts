import { Router } from 'express';
import { catchAsync } from '../utils/catchAsync.js';
import { signUp } from '../controllers/auth.controller.js';

const authRouter = Router();
authRouter.post('/signup', catchAsync(signUp));

export default authRouter;
