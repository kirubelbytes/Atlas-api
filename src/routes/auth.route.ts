import { Router } from 'express';
import { login, resendOTP, signUp, verifyEmail } from '../controllers/auth.controller.js';

const authRouter = Router();
authRouter.post('/signup', signUp);
authRouter.post('/verify-email', verifyEmail);
authRouter.post('/resend-otp', resendOTP);
authRouter.post('/login', login);

export default authRouter;
