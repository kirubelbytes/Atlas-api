import BaseError from '../base-error.js';
import { ERROR_CODES } from '../error-codes.js';
import { HttpStatus } from './http-status-code.js';

export class BadRequestError extends BaseError {
  readonly code = ERROR_CODES.BAD_REQUEST;
  readonly statusCode = HttpStatus.BAD_REQUEST;

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
