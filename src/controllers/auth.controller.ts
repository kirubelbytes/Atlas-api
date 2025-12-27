import { Request, Response } from 'express';
import {
  loginSchema,
  resendOTPSchema,
  signupSchema,
  verifyEmailSchema,
} from '../schemas/user.schema.js';
import { ValidationError } from '../errors/http/validation.error.js';
import { AuthService } from '../services/auth.service.js';
import { env } from '../config/env.js';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: (env.NODE_ENV = 'production'),
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const signUp = async (req: Request, res: Response) => {
  const validation = signupSchema.safeParse(req.body);
  if (!validation.success) {
    throw new ValidationError('Invalid input provided!');
  }
  const user = await AuthService.registerUser(validation.data);
  const { password: _, ...safeUser } = user;
  res.status(201).json({
    message: 'Success',
    data: safeUser,
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  const validation = verifyEmailSchema.safeParse(req.body);
  if (!validation.success) {
    throw new ValidationError('Invalid input provided');
  }
  const { email, otp } = validation.data;
  await AuthService.verifyEmail(email, otp);

  res.status(200).json({
    message: 'Email verified successfully. You can now log in.',
  });
};

export const resendOTP = async (req: Request, res: Response) => {
  const validation = resendOTPSchema.safeParse(req.body);
  if (!validation.success) {
    throw new ValidationError('Invalid input provided');
  }
  const { email } = validation.data;
  await AuthService.resendOTP(email);

  res.status(200).json({
    message: 'OTP sent successfully',
  });
};

export const login = async (req: Request, res: Response) => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) throw new ValidationError('Invalid Credentials');

  const { user, accessToken, refreshToken } = await AuthService.login(validation.data);

  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
  res.status(200).json({
    message: 'Login successfully',
    accessToken,
    user: { id: user.id, name: user.name, email: user.email },
  });
};
