import { Request, Response, NextFunction } from 'express';
import { resendOTPSchema, signupSchema, verifyEmailSchema } from '../schemas/user.schema.js';
import { ValidationError } from '../errors/http/validation.error.js';
import { AuthService } from '../services/auth.service.js';

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