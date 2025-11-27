import BaseError from '../base-error.js';
import { ERROR_CODES } from '../error-codes.js';
import { HttpStatus } from './http-status-code.js';

export class ValidationError extends BaseError {
  readonly code = ERROR_CODES.VALIDATION_ERROR;
  readonly statusCode = HttpStatus.VALIDATION_ERROR;

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
