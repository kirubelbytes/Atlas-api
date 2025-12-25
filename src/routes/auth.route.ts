import { Router } from 'express';
import { resendOTP, signUp, verifyEmail } from '../controllers/auth.controller.js';

const authRouter = Router();
authRouter.post('/signup', signUp);
authRouter.post('/verify-email', verifyEmail);
authRouter.post('/resend-otp', resendOTP);

export default authRouter;
