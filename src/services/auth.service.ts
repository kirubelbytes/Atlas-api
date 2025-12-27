import bcrypt from 'bcrypt';
import crypto from 'node:crypto';
import { prismaClient } from '../config/database.js';
import { BadRequestError } from '../errors/http/bad-request.error.js';
import { mailService } from './mail.service.js';
import { UnauthorizedError } from '../errors/http/unauthorized.error.js';
import { ForbiddenError } from '../errors/http/forbidden.error.js';
import { TokenService } from './token.service.js';


export class AuthService {
  static async registerUser(data: any) {
    const { name, email, password } = data;

    const existingUser = await prismaClient.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestError('User already exists');
    }

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

  static async verifyEmail(email: string, otp: string) {
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

    const user = await prismaClient.$transaction(async (tx) => {
      const tokenRecord = await tx.verificationToken.findFirst({
        where: {
          tokenHash: otpHash,
          type: 'EMAIL_VERIFICATION',
          expiresAt: { gt: new Date() },
          user: { email },
        },
        include: { user: true },
      });

      if (!tokenRecord) {
        throw new BadRequestError('Invalid or expired OTP');
      }

      const updatedUser = await tx.user.update({
        where: { id: tokenRecord.userId },
        data: { isEmailVerified: true },
      });

      await tx.verificationToken.delete({
        where: { id: tokenRecord.id },
      });

      return updatedUser;
    });

    mailService
      .sendWelcomEmail(user.email, user.name)
      .catch((err) => console.error('Welcome Email Error:', err));

    return user;
  }

  static async resendOTP(email: string) {
    const user = await prismaClient.user.findUnique({ where: { email } });
    if (!user) {
      throw new BadRequestError('User not found');
    }

    if (user.isEmailVerified) {
      throw new BadRequestError('Email is already verified');
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    const otpHash = crypto.createHash('sha256').update(otp).digest('hex');

    await prismaClient.$transaction(async (tx) => {
      await tx.verificationToken.deleteMany({
        where: { userId: user.id, type: 'EMAIL_VERIFICATION' },
      });

      await tx.verificationToken.create({
        data: {
          userId: user.id,
          tokenHash: otpHash,
          type: 'EMAIL_VERIFICATION',
          expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        },
      });
    });

    mailService
      .sendVerificationEmail(user.email, otp)
      .catch((err) => console.error('Resend Email Error:', err));
  }

  static async login(data: any) {
    const { email, password } = data
    const user = await prismaClient.user.findUnique({where: {email}});

    const isMatch = await bcrypt.compare(password, user?.password || '') 

    if(!user || !isMatch) 
        throw  new UnauthorizedError("Invalid credentials")
   
    if (!user?.isEmailVerified)
      throw new ForbiddenError('Please verify your email before logging in');

    const accessToken = await TokenService.generateAccess(user.id);
    const refreshToken = await TokenService.generateRefresh(user.id);

    const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

    await prismaClient.refreshToken.create({
        data: {
            userId: user.id,
            tokenHash,
            expiresAt : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
    })
    return { user, accessToken, refreshToken };
  }
}
