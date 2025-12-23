import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { prismaClient } from '../config/database.js';
import { BadRequestError } from '../errors/http/bad-request.error.js';
import { mailService } from './mail.service.js';

export class AuthService {
  static async registerUser(data: any) {
    const { name, email, password } = data;

    const existingUser = await prismaClient.user.findUnique({ where: { email } });
    if (existingUser) throw new BadRequestError('User already exists');

    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

    const user = await prismaClient.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: { name, email, password: hashedPassword },
      });

      await tx.verificationToken.create({
        data: {
          userId: newUser.id,
          tokenHash: otpHash,
          type: 'EMAIL_VERIFICATION',
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      });

      return newUser;
    });

    mailService
      .sendVerificationEmail(user.email, otp)
      .catch((err) => console.error('Delayed Email Error:', err));

    return user;
  }
}
