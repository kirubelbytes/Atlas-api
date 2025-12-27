// src/config/env.ts
import dotenv from 'dotenv';
import z from 'zod';
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),

  // Mail Configuration
  MAILTRAP_HOST: z.string().default('sandbox.smtp.mailtrap.io'),
  MAILTRAP_PORT: z.coerce.number().default(587),
  MAILTRAP_USER: z.string(),
  MAILTRAP_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
