import { Request, Response, NextFunction } from 'express';
import { signupSchema, verifyEmailSchema } from '../schemas/user.schema.js';
import { ValidationError } from '../errors/http/validation.error.js';
import { AuthService } from '../services/auth.service.js';

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
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

export const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  const validation = verifyEmailSchema.safeParse(req.body);
  if (!validation.success) {
    return next(new ValidationError('Invalid input provided'));
  }
  const { email, otp } = validation.data;
  await AuthService.verifyEmail(email, otp);

  res.status(200).json({
    mesage: 'Email verified successfully. You can now log in.',
  });
};
