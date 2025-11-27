import BaseError from '../base-error';
import { ERROR_CODES } from '../error-codes';
import { HttpStatus } from './http-status-code';

export class UnauthorizedError extends BaseError {
  readonly code = ERROR_CODES.UNAUTHORIZED;
  readonly statusCode = HttpStatus.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serialize() {
    return {
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
    };
  }
}
