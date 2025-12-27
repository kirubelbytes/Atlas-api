import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export class TokenService {
  static async generateAccess(userId: string) {
    return jwt.sign({ sub: userId }, env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
  }

  static async generateRefresh(userId: string) {
    return jwt.sign({ sub: userId }, env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  }
}
