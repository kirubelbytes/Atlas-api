import z from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 character long'),
});

export const verifyEmailSchema = z.object({
  email: z.string().email('Invalid email format'),
  otp: z.string().length(6, 'OTP must be exctly 6 digits'),
});

export const resendOTPSchema = z.object({
  email: z.string().email('Invalid email format'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 character long'),
});
