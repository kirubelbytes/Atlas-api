import nodemailer from 'nodemailer';
import { env } from '../config/env';

class MailService {
  private transporter = nodemailer.createTransport({
    host: env.MAILTRAP_HOST,
    port: env.MAILTRAP_PORT,
    auth: {
      user: env.MAILTRAP_USER,
      pass: env.MAILTRAP_PASSWORD,
    },
  });

  async sendVerificationEmail(to: string, otp: string) {
    return await this.transporter.sendMail({
      from: '"Kidame Gebeya Team" <no-reply@kidamegebeya.com>',
      to,
      subject: 'Verify your email',
      html: `<p>Your verification code is <strong>${otp}</strong></p>`,
    });
  }
}

export const mailService = new MailService();
