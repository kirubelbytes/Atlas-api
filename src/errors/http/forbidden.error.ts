import BaseError from '../base-error.js';
import { ERROR_CODES } from '../error-codes.js';
import { HttpStatus } from './http-status-code.js';

export class ForbiddenError extends BaseError {
  readonly code = ERROR_CODES.FORBIDDEN;
  readonly statusCode = HttpStatus.FORBIDDEN;

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
