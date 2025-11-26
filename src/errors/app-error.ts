import BaseError from './base-error';
import { HttpStatus } from './http/http-status-code';

export class AppError extends BaseError {
  code = 'INTERNAL_ERROR';
  statusCode = HttpStatus.INTERNAL_ERROR;

  constructor(message: string) {
    super(message)
  }

  serialize() {
      return {
        message : this.message,
        code : this.code,
        statusCode: this.statusCode,
      }
  }
}