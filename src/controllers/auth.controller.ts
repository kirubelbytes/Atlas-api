import { Request, Response, NextFunction } from 'express';
import { signupSchema } from '../schemas/user.schema.js';
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